import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect } from 'react'
import { walletAtom, walletPresentAtom } from '../store/walletStore';
import { Box, Modal, Typography } from '@mui/material';
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
    rewardAttribute
}: {
    children: JSX.Element,
    rewardAttribute?: RewardAttribute
}) => {
    const walletPresent = useAtomValue(walletPresentAtom);
    const [wallet] = useAtom(walletAtom);

    useEffect(() => {
        (async () => {
            if (rewardAttribute?.id && wallet.address) {
                await onVerifyID(rewardAttribute, wallet);
            }
        })()
    }, [wallet.address, rewardAttribute])
    if (!walletPresent)
        return (
            <Modal open={true}>
                <Box sx={style}>
                    <Typography variant="h6" sx={{ marginY: 2 }}>
                        Connect Wallet to access page
                    </Typography>
                    <Wallet />
                </Box>
            </Modal>
        )
    return children;
}

export default WalletEnsure