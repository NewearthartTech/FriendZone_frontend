import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { countries } from "../utils/countries"
const Upload = () => {
  const [countryCode, setCountryCode] = useState<string>()
  return (
    <Box sx={{ textAlign: "center" }} mt={12}>
      <Typography textAlign="center" variant="h3" gutterBottom>Create link for sharing</Typography>
      <FormControl fullWidth sx={{ maxWidth: "30rem" }}>
        <InputLabel id="country-select">Country</InputLabel>
        <Select
          labelId="country-select"
          id="country-select"
          value={countryCode}
          label="Country"
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {countries.map(country => <MenuItem value={country.code}>{country.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  )
}

export default Upload
