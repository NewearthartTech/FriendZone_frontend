import { Alert, AlertTitle, Backdrop, Link, Box, Card, CardContent, Chip, CircularProgress, Typography, IconButton, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ReferalResponse } from '../utils/types';
import WalletEnsure from '../components/walletEnsure';
import { countries } from '../utils/countries';
import { copyText } from '../utils/utils';
import toast from 'react-hot-toast';
import { ContentCopy } from '@mui/icons-material';
import { walletAtom } from '../store/walletStore';
import { useAtom } from 'jotai';
const Claim = () => {
    const { id } = useParams();
    const [shareReferral, setShareReferral] = useState<ReferalResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [wallet] = useAtom(walletAtom)
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                await setTimeout(() => {
                    setShareReferral({
                        rewardAttribute: {
                            walletAddress: "3v1JUB1R1JLFtcKvHqD9QFqe2NXeBF53tp69FLPHYipTjNgLrV",
                            numberOfUsersAbleToClaim: 12,
                            countries: ["DE", "GB"],

                            minAge: 17,
                            maxAge: 39,
                            rewardLink: "https://www.google.com/",
                        },
                        referal: {
                            personalLink: "http://localhost:5173/refClaim/23224",
                            walletAddress: wallet.address
                        }
                    });
                    setIsLoading(false);
                }, 3000)

            }
            catch {
                setHasError(true)
            }
        })()
    }, []);
    if (hasError)
        return (
            <WalletEnsure>
                <Alert severity="error" sx={{ my: 8 }}>
                    <AlertTitle>Claim link unavalaible</AlertTitle>
                    Sadly, this link is unavalaible
                </Alert>
            </WalletEnsure>)
    if (isLoading)
        return (
            <WalletEnsure>
                <Box sx={{ mt: "30%", textAlign: "center" }}>
                    <CircularProgress color="warning" size={100} />
                </Box>
            </WalletEnsure>
        )
    // Set up your claim page Claiming & Sharing further
    return (
        <WalletEnsure>
            <>
                <Typography textAlign="center" variant="h4" marginTop={4} gutterBottom>
                    Shareable reward details
                </Typography>
                <Card variant="outlined" sx={{ maxWidth: "35rem", mx: "auto" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Created by
                        </Typography>
                        <Typography sx={{ wordBreak: "break-all" }} gutterBottom>
                            {shareReferral?.rewardAttribute.walletAddress}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Avalaible in
                        </Typography>
                        {shareReferral?.rewardAttribute?.countries?.map((country, i) => (<Chip
                            sx={{ margin: 1 }}
                            size="small"
                            variant="outlined"
                            label={countries.find(e => e.code === country)?.name}
                        />))}
                        <Box my={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Link awarded
                            </Typography>
                            <Box sx={{
                                position: "relative",
                                border: '2px solid #343434',
                                borderRadius: "10px",
                                textAlign: "center",
                                mx: "0.5em",
                                my: 1,
                                padding: "0.5em"
                            }}>
                                <Link href={shareReferral?.rewardAttribute?.rewardLink} target="_blank">{shareReferral?.rewardAttribute?.rewardLink}</Link>
                                <IconButton onClick={() => {
                                    copyText(shareReferral?.rewardAttribute?.rewardLink ?? "")
                                    toast.success("Link copied successfully")
                                }} aria-label="copy" sx={{ position: "absolute", top: "50%", transform: "translate(-50%,-50%)", right: -10 }}>
                                    <ContentCopy />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box my={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Link to share
                            </Typography>
                            <Box sx={{
                                color: "#ffc107",
                                position: "relative",
                                border: '2px solid #343434',
                                borderRadius: "10px",
                                textAlign: "center",
                                mx: "0.5em",
                                my: 1,
                                padding: "0.5em"
                            }}>
                                <Link color="inherit" href={shareReferral?.referal?.personalLink} target="_blank">{shareReferral?.referal?.personalLink}</Link>
                                <IconButton onClick={() => {
                                    copyText(shareReferral?.referal?.personalLink ?? "")
                                    toast.success("Link copied successfully")
                                }} aria-label="copy" sx={{ position: "absolute", top: "50%", transform: "translate(-50%,-50%)", right: -10 }}>
                                    <ContentCopy />
                                </IconButton>
                            </Box>
                        </Box>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Reward avalaible
                        </Typography>
                        <Typography variant="h5">
                            {((shareReferral?.rewardAttribute?.amountPaidPerClick ?? 1) * 12).toFixed(2)} CCD
                        </Typography>
                    </CardContent>
                </Card>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Button variant="contained">
                        Claim Reward
                    </Button>
                </Box>

                <Alert sx={{ mt: 4, maxWidth: "30rem", mx: "auto" }} variant="outlined" severity="success" >
                    Reward claimed successfully, received {((shareReferral?.rewardAttribute?.amountPaidPerClick ?? 1) * 12).toFixed(2)}  CCD
                </Alert>
                <Alert sx={{ mt: 4, maxWidth: "30rem", mx: "auto" }} variant="outlined" severity="error" >
                    CCD Reward already claimed
                </Alert>
            </>
        </WalletEnsure>
    )
}

export default Claim
