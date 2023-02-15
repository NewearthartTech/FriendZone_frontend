import { Alert, Link, Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, Slider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { countries } from "../utils/countries"
import { IAsyncResult, RewardAttribute } from '../utils/types';
import WalletEnsure from '../components/walletEnsure';
import toast from 'react-hot-toast';
import { copyText, validShareReward } from '../utils/utils';
import { ContentCopy } from '@mui/icons-material';
import { walletAtom } from '../store/walletStore';
import { useAtom } from 'jotai';
import LoadingButton from '@mui/lab/LoadingButton';
import { createRewardAttributes } from '../utils/backend';
const Upload = () => {
    const [wallet] = useAtom(walletAtom)
    const [shareReward, setShareReward] = useState<RewardAttribute>(
        {
            WalletAddress: wallet.address,
            NumberOfUsersAbleToClaim: 1,
            Countries: []
        }
    )
    const [generatedLink, setGeneratedLink] = useState<IAsyncResult<string>>();
    const generateLink = async () => {
        setGeneratedLink({ isLoading: true });
        try {
            console.log(shareReward)
            const generatedRewardAttribute = await createRewardAttributes(shareReward);
            setGeneratedLink({ result: generatedRewardAttribute.RewardLink });
        }
        catch (e: any) {
            setGeneratedLink({ error: e })
        }
    }
    return (
        <WalletEnsure>
            <Box sx={{ textAlign: "center" }} mt={12}>
                <Typography mx="auto" mb={8} variant="h4" gutterBottom>Create shareable reward</Typography>
                <Box sx={{ maxWidth: "30rem" }} mx="auto">
                    <Typography variant="h5" my={2} textAlign="left">Countries avalaible to</Typography>
                    <FormControl fullWidth >
                        <InputLabel id="country-select">Country</InputLabel>
                        <Select
                            labelId="country-select"
                            id="country-select"
                            multiple
                            value={shareReward?.Countries ?? []}
                            label="Countries"
                            onChange={(e: SelectChangeEvent<string[]>) => {
                                const {
                                    target: { value },
                                } = e;
                                setShareReward({ ...shareReward, Countries: typeof value === 'string' ? value.split(',') : value })
                            }
                            }
                        >
                            {countries.map(country => <MenuItem value={country.code}>{country.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {shareReward?.Countries.map((country, i) => (<Chip
                        sx={{ margin: 1 }}
                        label={countries.find(e => e.code === country)?.name}
                        onDelete={() => {
                            const tCountries = shareReward.Countries ?? [];
                            tCountries.splice(i, 1);
                            setShareReward({ ...shareReward, Countries: tCountries });
                        }}
                    />))}

                    <Typography variant="h5" my={2} textAlign="left">Ages avalaible to</Typography>
                    <Stack
                        justifyContent="center"
                        my={3}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField label="Min. age" value={shareReward.MinAge} onChange={e => {
                            const cleanNum = (e.target.value || '').replace(/[^0-9\.]+/g,
                                ''
                            );
                            setShareReward({ ...shareReward, MinAge: cleanNum })
                        }} fullWidth />
                        <TextField label="Max age" value={shareReward.MaxAge} onChange={e => {
                            const cleanNum = (e.target.value || '').replace(/[^0-9\.]+/g,
                                ''
                            );
                            setShareReward({ ...shareReward, MaxAge: cleanNum })
                        }} fullWidth />
                    </Stack>
                    <Typography variant="h5" my={2} textAlign="left">Link to share to users</Typography>
                    <TextField label="Link to share" value={shareReward.RewardLink} onChange={(e) => {
                        setShareReward({ ...shareReward, RewardLink: e.target.value });
                    }
                    } placeholder="https://" fullWidth />
                    <Typography variant="h5" my={2} textAlign="left">No. of users able to claim CCD: {shareReward.NumberOfUsersAbleToClaim}</Typography>
                    <Slider
                        color="primary"
                        aria-label="Max Users"
                        value={shareReward?.NumberOfUsersAbleToClaim}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, NumberOfUsersAbleToClaim: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={24}
                    />

                    <Typography variant="h5" my={2} textAlign="left">CCD paid for each guest click: <b>{shareReward.AmountPaidPerClick} CCD</b></Typography>
                    <Slider
                        color="primary"
                        aria-label="Max Users"
                        value={shareReward?.AmountPaidPerClick}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, AmountPaidPerClick: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={1}
                        max={120}
                    />

                    <Typography variant="h5" my={2} textAlign="left">Max claimable link clicks per guest: {shareReward.MaxPaidClicksPerUser}</Typography>
                    <Slider
                        color="secondary"
                        aria-label="Max clicks per user"
                        value={shareReward?.MaxPaidClicksPerUser}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, MaxPaidClicksPerUser: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={1}
                        max={120}
                    />

                    <Typography variant="h6" my={2} textAlign="left">
                        Est. grand total: {
                            (shareReward.AmountPaidPerClick ?? 0) *
                            (shareReward.NumberOfUsersAbleToClaim ?? 0) *
                            (shareReward.MaxPaidClicksPerUser ?? 0)
                        } CCD
                    </Typography>
                    <LoadingButton loading={generatedLink?.isLoading} disabled={!validShareReward(shareReward)} onClick={() => generateLink()} variant="contained" color="warning" sx={{ marginY: 4 }}>
                        Generate reward link
                    </LoadingButton>
                    {generatedLink?.error && (
                        <Alert sx={{ mb: 4 }} severity="error">
                            Couldn't generate link
                        </Alert>
                    )}
                    {generatedLink?.result && (
                        <Alert sx={{ mb: 4 }} action={<IconButton onClick={() => {
                            copyText(shareReward?.RewardLink ?? "")
                            toast.success("Link copied successfully")
                        }} aria-label="copy" >
                            <ContentCopy />
                        </IconButton>} severity="success">
                            Shareable link generated: <Link variant="inherit" href={generatedLink.result}>
                                {generatedLink.result}
                            </Link>
                        </Alert>)}
                </Box>
            </Box>
        </WalletEnsure>
    )
}

export default Upload
