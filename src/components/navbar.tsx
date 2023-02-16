import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Wallet from './wallet';
import { Add } from '@mui/icons-material';
import { Button, Link, useMediaQuery } from '@mui/material';
import { useAtomValue } from 'jotai';
import { walletPresentAtom } from '../store/walletStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const walletPresent = useAtomValue(walletPresentAtom);
    const matches = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontStyle: "italic" }}>
                        <Link href="/" variant="inherit" underline="none">
                            FrndZone
                        </Link>
                    </Typography>

                    {walletPresent && (<Button onClick={() => navigate("/upload")} sx={{ marginX: "1em", padding: "10px" }} variant="outlined">
                        <Add /> {matches && <span>Create shareable link</span>}
                    </Button>)}
                    <Wallet />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
