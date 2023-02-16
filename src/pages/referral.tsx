import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom';
import { walletAtom } from '../store/walletStore';
import { getReferralInfo } from '../utils/backend';
import WalletEnsure from '../components/walletEnsure';
import { Alert, Box, CircularProgress } from '@mui/material';
import { RewardAttribute } from '../utils/types';

const Referral = () => {
    const { id } = useParams();
    const [error, setError] = useState<boolean>();
    const [rewardAttribute, setRewardAttribute] = useState<RewardAttribute>()
    const [wallet] = useAtom(walletAtom);
    useEffect(() => {
        if (wallet.address)
            (async () => {
                try {
                    const gottenReferral = await getReferralInfo(`${id}`);
                    /*   window.location.replace(gottenReferral.rewardAttribute.rewardLink!); */
                    setRewardAttribute(gottenReferral.rewardAttribute)
                }
                catch {
                    setError(true);
                }
            })();
    }, [wallet.address])
    const redirectClient = async () => {
        try {
            if (rewardAttribute)
                window.location.replace(rewardAttribute.rewardLink!);
        }
        catch {
            setError(true);
        }
    }
    if (error)
        return (
            <Alert sx={{ mt: 4, maxWidth: "30rem", mx: "auto" }} variant="outlined" severity="error" >
                Couldn't claim Reward link
            </Alert>
        )
    return (
        <WalletEnsure rewardAttribute={rewardAttribute} execAfterValidation={redirectClient}>
            <Box sx={{ mt: "30%", textAlign: "center" }}>
                <CircularProgress color="info" size={100} />
            </Box>
        </WalletEnsure>
    )
}

export default Referral