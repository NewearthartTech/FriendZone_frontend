import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Wallet from './wallet';

const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontStyle: "italic" }}>
                        FrndZ
                    </Typography>
                    <Wallet />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
