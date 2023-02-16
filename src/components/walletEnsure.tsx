import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react'
import { walletAtom, walletPresentAtom } from '../store/walletStore';
import { Alert, AlertTitle, Box, CircularProgress, Modal, Typography } from '@mui/material';
import Wallet from './wallet';
import { RewardAttribute } from '../utils/types';
import { onVerifyID } from '../utils/verifyId';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "30rem",
    minWidth: 300,
    textAlign: "center",
    bgcolor: 'background.paper',
    border: '2px solid #343434',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};
const WalletEnsure = ({
    children,
    rewardAttribute,
    execAfterValidation
}: {
    children: JSX.Element,
    rewardAttribute?: RewardAttribute,
    execAfterValidation?: () => Promise<any>
}) => {
    const walletPresent = useAtomValue(walletPresentAtom);
    const [wallet] = useAtom(walletAtom);
    const [incompatibleID, setIncompatibleID] = useState<boolean>();
    const [askedID, setAskedID] = useState<boolean>();
    useEffect(() => {
        (async () => {
            if (rewardAttribute?.id && wallet.address) {
                setAskedID(true)
                const validAccount = await onVerifyID(rewardAttribute, wallet)
                setIncompatibleID(!validAccount)
                if (validAccount && execAfterValidation) {
                    await execAfterValidation();
                }
            }
            setAskedID(false)
        })()
    }, [wallet.address, rewardAttribute])
    if (incompatibleID)
        return <Alert sx={{ margin: 4 }} severity="error">
            <AlertTitle>Error</AlertTitle>
            This content isn't avalaible for you
        </Alert>
    if (!walletPresent || askedID)
        return (
            <Modal open={true}>
                <Box sx={style}>
                    <Typography variant="h6" sx={{ marginY: 2 }}>
                        Connect Wallet to access page
                    </Typography>
                    {askedID ? <CircularProgress /> : <Wallet />}
                </Box>
            </Modal>
        )

    return children;
}

export default WalletEnsure