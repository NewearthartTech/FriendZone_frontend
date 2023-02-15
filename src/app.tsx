import Navbar from "./components/navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Upload from "./pages/upload";
import Claim from "./pages/claim";
import Referral from "./pages/referral";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<>
                <Navbar />
                <Outlet />
            </>}>
                <Route path="/" element={<Home />} />
                <Route path="upload" element={<Upload />} />
                <Route path="claim/:id" element={<Claim />} />
                <Route path="ref/:id" element={<Referral />} />
            </Route>
        )
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Toaster toastOptions={{
                style: {
                    borderRadius: '10px',
                    borderColor: '#101010',
                    background: '#060606',
                    color: '#fff',
                }
            }} />
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
