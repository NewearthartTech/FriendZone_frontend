import { Alert, Link, Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, Slider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { countries } from "../utils/countries"
import { ShareReward } from '../utils/types';
import WalletEnsure from '../components/walletEnsure';
import toast from 'react-hot-toast';
import { copyText } from '../utils/utils';
import { ContentCopy } from '@mui/icons-material';
const Upload = () => {
    const [shareReward, setShareReward] = useState<ShareReward>(
        {
            maxUsers: 1,
            countries: []
        }
    )
    const [generatedLink, setGeneratedLink] = useState<string>();
    const generateLink = async () => {
        await setTimeout(() => {
            setGeneratedLink("http://localhost:5173/claim/123445")
        },
            1000)
    }
    return (
        <WalletEnsure>
            <Box sx={{ textAlign: "center" }} mt={12}>
                <Typography mx="auto" mb={8} variant="h4" gutterBottom>Create link for sharing reward</Typography>
                <Box sx={{ maxWidth: "30rem" }} mx="auto">
                    <Typography variant="h5" my={2} textAlign="left">Countries</Typography>
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

                    <Typography variant="h5" my={2} textAlign="left">Ages</Typography>
                    <Stack
                        justifyContent="center"
                        my={3}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <TextField label="Min. age" inputProps={{ inputMode: 'numeric', pattern: '/[^0-9\.]+/g' }} fullWidth />
                        <TextField label="Max age" inputProps={{ inputMode: 'numeric', pattern: '/[^0-9\.]+/g' }} fullWidth />
                    </Stack>

                    <Typography variant="h5" my={2} textAlign="left">Reward amount</Typography>
                    <TextField InputProps={{
                        startAdornment: <InputAdornment position="start">CCD</InputAdornment>,
                    }} label="Reward Amount" inputProps={{ inputMode: 'numeric', pattern: '/[^0-9\.]+/g' }} fullWidth />

                    <Typography variant="h5" my={2} textAlign="left">No. of users able to claim: {shareReward.maxUsers}</Typography>
                    <Slider
                        color="primary"
                        aria-label="Max Users"
                        value={shareReward?.maxUsers}
                        onChange={(event: Event, newValue: number | number[]) => {
                            setShareReward({ ...shareReward!, maxUsers: newValue as number })
                        }}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={24}
                    />
                    {shareReward.rewardAmount && (<Typography variant="body2" textAlign="right" color="gray">{Number(shareReward.rewardAmount) / (shareReward.maxUsers ?? 1)} CCD for each user</Typography>)}
                    <Button onClick={() => generateLink()} variant="contained" color="warning" sx={{ marginY: 4 }}>
                        Generate reward link
                    </Button>

                    {generatedLink && (
                        <Alert sx={{ mb: 4 }} action={<IconButton onClick={() => {
                            copyText(shareReward?.link ?? "")
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
