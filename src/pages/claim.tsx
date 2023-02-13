import { Alert, AlertTitle, Backdrop, Link, Box, Card, CardContent, Chip, CircularProgress, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShareReward } from '../utils/types';
import WalletEnsure from '../components/walletEnsure';
import { countries } from '../utils/countries';
import { copyText } from '../utils/utils';
import toast from 'react-hot-toast';
import { ContentCopy } from '@mui/icons-material';
const Claim = () => {
    const { id } = useParams();
    const [shareReward, setShareReward] = useState<ShareReward>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                await setTimeout(() => {
                    setShareReward({
                        maxUsers: 12,
                        countries: ["DE", "GB"],
                        rewardAmount: 23852,
                        minAge: 17,
                        maxAge: 39,
                        link: "https://www.google.com/"
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
    return (
        <WalletEnsure>
            <>
                <Typography textAlign="center" variant="h3" marginTop={4} gutterBottom>
                    Claim reward
                </Typography>
                <Card variant="outlined" sx={{ maxWidth: "35rem", mx: "auto" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Avalaible in
                        </Typography>
                        {shareReward?.countries.map((country, i) => (<Chip
                            sx={{ margin: 1 }}
                            size="small"
                            variant="outlined"
                            label={countries.find(e => e.code === country)?.name}
                        />))}
                        <Box my={2}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Link to claim:
                            </Typography>
                            <Box sx={{
                                position: "relative",
                                border: '2px solid #343434',
                                borderRadius: "10px",
                                textAlign: "center",
                                mx: "2em",
                                padding: "0.5em"
                            }}>
                                <Link href={shareReward?.link} target="_blank">{shareReward?.link}</Link>
                                <IconButton onClick={() => {
                                    copyText(shareReward?.link ?? "")
                                    toast.success("Link copied successfully")
                                }} aria-label="copy" sx={{ position: "absolute", top: "50%", transform: "translate(-50%,-50%)", right: -10 }}>
                                    <ContentCopy />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="h5">
                            Claimed {(Number(shareReward?.rewardAmount) / (shareReward?.maxUsers ?? 1)).toFixed(2)} CCD
                        </Typography>
                    </CardContent>
                </Card>
            </>
        </WalletEnsure>
    )
}

export default Claim
