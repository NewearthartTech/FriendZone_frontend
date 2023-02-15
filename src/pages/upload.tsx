import { Alert, Link, Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, Slider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { countries } from "../utils/countries"
import { RewardAttribute } from '../utils/types';
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
            numberOfUsersAbleToClaim: 1,
            countries: []
        }
    )
    const [generatedLink, setGeneratedLink] = useState<string>();
    const [loading, setLoading] = useState<boolean>();
    const [failed, setFailed] = useState<boolean>();
    const generateLink = async () => {
        setFailed(false)
        setLoading(true)
        if (wallet.address)
            try {
                const generatedRewardAttribute = await createRewardAttributes({ ...shareReward, walletAddress: wallet.address });
                setGeneratedLink(`${import.meta.env.DEV ? "http://" : "https://"}${window.location.host}/claim/${generatedRewardAttribute.id}`);
            }
            catch (e: any) {
                console.log(e)
                setFailed(true);
            }
        setLoading(false)
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
                            value={shareReward?.countries ?? []}
                            label="Countries"
                            onChange={(e: SelectChangeEvent<string[]>) => {
                                const {
                                    target: { value },
                                } = e;
                                setShareReward({ ...shareReward, countries: typeof value === 'string' ? value.split(',') : value })
                            }
                            }
                        >
                            {countries.map(country => <MenuItem value={country.code}>{country.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {shareReward?.countries.map((country, i) => (<Chip
                        sx={{ margin: 1 }}
                        label={countries.find(e => e.code === country)?.name}
                        onDelete={() => {
                            const tCountries = shareReward.countries ?? [];
                            tCountries.splice(i, 1);
                            setShareReward({ ...shareReward, countries: tCountries });
                        }}
                    />))}

                    <Typography variant="h5" my={2} textAlign="left">Ages avalaible to</Typography>
                    <Stack
                        justifyContent="center"
                        my={3}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField label="Min. age" value={shareReward.minAge} onChange={e => {
                            const cleanNum = (e.target.value || '').replace(/[^0-9\.]+/g,
                                ''
                            );
                            setShareReward({ ...shareReward, minAge: cleanNum })
                        }} fullWidth />
                        <TextField label="Max age" value={shareReward.maxAge} onChange={e => {
                            const cleanNum = (e.target.value || '').replace(/[^0-9\.]+/g,
                                ''
                            );
                            setShareReward({ ...shareReward, maxAge: cleanNum })
                        }} fullWidth />
                    </Stack>
                    <Typography variant="h5" my={2} textAlign="left">Link to share to users</Typography>
                    <TextField label="Link to share" value={shareReward.rewardLink} onChange={(e) => {
                        setShareReward({ ...shareReward, rewardLink: e.target.value });
                    }
                    } placeholder="https://" fullWidth />
                    <Typography variant="h5" my={2} textAlign="left">No. of users able to claim CCD: {shareReward.numberOfUsersAbleToClaim}</Typography>
                    <Slider
                        color="primary"
                        aria-label="Max Users"
                        value={shareReward?.numberOfUsersAbleToClaim}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, numberOfUsersAbleToClaim: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={24}
                    />

                    <Typography variant="h5" my={2} textAlign="left">CCD paid for each guest click: <b>{shareReward.amountPaidPerClick} CCD</b></Typography>
                    <Slider
                        color="primary"
                        aria-label="Max Users"
                        value={shareReward?.amountPaidPerClick}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, amountPaidPerClick: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={1}
                        max={120}
                    />

                    <Typography variant="h5" my={2} textAlign="left">Max claimable link clicks per guest: {shareReward.maxPaidClicksPerUser}</Typography>
                    <Slider
                        color="secondary"
                        aria-label="Max clicks per user"
                        value={shareReward?.maxPaidClicksPerUser}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, maxPaidClicksPerUser: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={1}
                        max={120}
                    />

                    <Typography variant="h6" my={2} textAlign="left">
                        Est. grand total: {
                            (shareReward.amountPaidPerClick ?? 0) *
                            (shareReward.numberOfUsersAbleToClaim ?? 0) *
                            (shareReward.maxPaidClicksPerUser ?? 0)
                        } CCD
                    </Typography>
                    <LoadingButton loading={loading} disabled={!validShareReward(shareReward)} onClick={() => generateLink()} variant="contained" color="warning" sx={{ marginY: 4 }}>
                        Generate reward link
                    </LoadingButton>
                    {failed && (
                        <Alert sx={{ mb: 4 }} severity="error">
                            Couldn't generate link
                        </Alert>
                    )}
                    {generatedLink !== `${window.location.host}/claim/undefined` && generatedLink && (
                        <Alert sx={{ mb: 4 }} action={<IconButton onClick={() => {
                            copyText(generatedLink ?? "")
                            toast.success("Link copied successfully")
                        }} aria-label="copy" >
                            <ContentCopy />
                        </IconButton>} severity="success">
                            Shareable link generated: <Link variant="inherit" href={generatedLink}>
                                {generatedLink}
                            </Link>
                        </Alert>)}
                </Box>
            </Box>
        </WalletEnsure>
    )
}

export default Upload
