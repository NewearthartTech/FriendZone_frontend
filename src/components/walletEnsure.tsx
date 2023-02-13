import { useAtomValue } from 'jotai';
import React from 'react'
import { walletPresentAtom } from '../store/walletStore';
import { Box, Modal, Typography } from '@mui/material';
import Wallet from './wallet';

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
const WalletEnsure = ({ children }: { children: JSX.Element }) => {
    const walletPresent = useAtomValue(walletPresentAtom);
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