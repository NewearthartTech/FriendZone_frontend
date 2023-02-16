import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom';
import { walletAtom } from '../store/walletStore';
import { getReferralInfo } from '../utils/backend';
import WalletEnsure from '../components/walletEnsure';
import { Alert, Box, CircularProgress } from '@mui/material';
import { onVerifyID } from '../utils/verifyId';

const Referral = () => {
    const { id } = useParams();
    const [error, setError] = useState<boolean>();
    const [wallet] = useAtom(walletAtom);
    useEffect(() => {
        if (wallet.address)
            (async () => {
                try {
                    const gottenReferral = await getReferralInfo(`${id}`);
                    await onVerifyID(gottenReferral.rewardAttribute, wallet);
                    window.location.replace(gottenReferral.rewardAttribute.rewardLink!);
                }
                catch {
                    setError(true);
                }
            })();
    }, [wallet.address])
    if (error)
        return (
            <Alert sx={{ mt: 4, maxWidth: "30rem", mx: "auto" }} variant="outlined" severity="error" >
                Couldn't claim Reward link
            </Alert>
        )
    return (
        <WalletEnsure>
            <Box sx={{ mt: "30%", textAlign: "center" }}>
                <CircularProgress color="info" size={100} />
            </Box>
        </WalletEnsure>
    )
}

export default Referral