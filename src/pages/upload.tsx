import { Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { countries } from "../utils/countries"
import { ShareReward } from '../utils/types';
const Upload = () => {
    const [countryCode, setCountryCode] = useState<string>();
    const [shareReward, setShareReward] = useState<ShareReward>()
    return (
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

                <Button variant="contained" color="warning" sx={{ marginTop: 4 }}>
                    Generate reward link
                </Button>
            </Box>
        </Box>
    )
}

export default Upload
