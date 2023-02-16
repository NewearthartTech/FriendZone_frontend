import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
    return (
        <Box>
            <Stack
                justifyContent="center"
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Box sx={{ marginTop: 23, marginBottom: { md: 10 }, textAlign: "center" }}>
                    <Typography variant="h3">
                        Welcome to FrndZone
                    </Typography>
                    <Typography fontSize={14} m={4}>
                        FrndZ is an app which gives you rewards for sharing links among friends. Whenever you share a link with a friend, he/ she opens it and you get a reward in CCD
                    </Typography>
                </Box>
                <img src="/startrewards.png" style={{ maxWidth: "40rem", margin: "auto 0" }} />
            </Stack>
            <Stack

                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Box sx={{ m: 4 }}>
                    <Typography variant="h4">
                        How it works
                    </Typography>
                    <Typography fontSize={14}>
                        <ul>
                            <li>Login to FrndZ using wallet</li>
                            <li>Select the creator and create your personal shareable link.</li>
                            <li>Copy and share it friends using Facebook, whatsapp, twitter, Instagram, message, etc</li>
                        </ul>
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default Home
