import { useState, useMemo } from 'react';
import Home from './pages/Home';
import './App.css';

// Components
import Loader from './components/Loader';

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Styles
import { theme } from './theme/MainTheme';
import Typography from '@mui/material/Typography';

import { Route, Routes } from 'react-router-dom';
import CountryInfo from './pages/CountryInfo';


function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  /**Handle dark and light mode */
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Grid container pl={4} pr={4} justifyContent="flex-start">
            <Grid item xs><Typography variant="h5" fontWeight={600}>Where in the world?</Typography></Grid>
            <Grid item sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {mode === "dark" && <DarkModeIcon />}
                {mode === "light" && <DarkModeOutlinedIcon />}
              </IconButton><Typography variant="caption" fontWeight={300} sx={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}> Dark Mode</Typography></Grid>
          </Grid></Toolbar>
      </AppBar>
      <Toolbar />

      <Routes>
        <Route path='country/:countryName' element={<CountryInfo />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
