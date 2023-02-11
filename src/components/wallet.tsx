import { walletPresentAtom, addressPreviewAtom, initiateWalletAtom } from '../store/walletStore';
import LoginIcon from '@mui/icons-material/Login';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, Stack } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react'
import { teal } from '@mui/material/colors';

const Wallet = () => {
  const walletPresent = useAtomValue(walletPresentAtom);
  const previewAddress = useAtomValue(addressPreviewAtom);
  const initiateWallet = useSetAtom(initiateWalletAtom);

  if (walletPresent)
    return (
      <Stack direction="row" borderColor={teal[500]} color={teal[500]} border={1} padding="10px" borderRadius="5px" spacing={2} >
        <AccountBalanceWalletIcon />
        <p>{previewAddress}</p>
      </Stack >
    )
  return (
    <Button onClick={initiateWallet} startIcon={<LoginIcon />} color="primary" variant="outlined">Connect wallet</Button>
  )
}

export default Wallet
