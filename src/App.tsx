import { useState, useMemo, useEffect } from 'react';
import Home from './pages/Home';
import './App.css';
import { useQuery } from '@apollo/client';

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

// Styles
import { theme } from './theme/MainTheme';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import { GET_COUNTRIES } from './queries/getCountries';


function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [regionFilter, setRegionFilter] = useState<string>("");

  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countriesData, setCountriesData] = useState<any[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      setCountriesData(data.countries);
    }
  }, [data])

  useEffect(() => {
    if (regionFilter !== "" && countriesData !== undefined) {
      const filteredData = data.countries.filter((c: any) => c.region === regionFilter);
      setCountriesData([...filteredData]);
    }
  }, [regionFilter])

  /**Handle dark and light mode */
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const handleFilterChange = (event: SelectChangeEvent) => {
    setRegionFilter(event.target.value as string);
  };

  const handleSearchChange = (event: any, value: any) => {
    if (value === "") {
      setCountriesData([...data.countries]);
    }
    else if (value !== undefined && value !== null) {
      const filteredList = countriesData.filter((option) => option.name.toLowerCase().includes(value.toLowerCase()));
      setCountriesData([...filteredList]);
    }
  }

  if (loading) {
    return <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  }
  if (error) return <p>Error: {error.message}</p>;


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
      <Grid container pl={6} pr={6} pt={4}>
        <Grid item xs>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={countriesData.map((option: any) => option.name)}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (< InputAdornment position="start" sx={{ marginLeft: 2 }}> <SearchIcon /> </InputAdornment>),
                  placeholder: "Search for a country..."
                }}
                sx={{ maxWidth: "40%" }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Paper>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                {regionFilter === "" && <InputLabel shrink={false} id="demo-simple-select-label" sx={{ paddingLeft: '0.5rem'}}>Filter by Region</InputLabel>}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Filter by Region"
                  value={regionFilter}
                  onChange={handleFilterChange}

                >
                  <MenuItem value={"Africa"}>Africa</MenuItem>
                  <MenuItem value={"America"}>America</MenuItem>
                  <MenuItem value={"Asia"}>Asia</MenuItem>
                  <MenuItem value={"Europe"}>Europe</MenuItem>
                  <MenuItem value={"Oceania"}>Oceania</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Home countriesData={countriesData} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
