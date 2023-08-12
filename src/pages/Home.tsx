//MUI
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { GET_COUNTRIES } from '../queries/getCountries';
import { useQuery } from '@apollo/client';

const Home = () => {

    const [regionFilter, setRegionFilter] = useState<string>("");
    const [countriesData, setCountriesData] = useState<any[]>([]);
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_COUNTRIES);

    useEffect(() => {
        if (data !== undefined && !loading) {
            setCountriesData(data.countries);
        }
    }, [data])

    useEffect(() => {
        if (regionFilter !== "" && countriesData !== undefined) {
            const filteredData = data.countries.filter((c: any) => c.region === regionFilter);
            setCountriesData([...filteredData]);
        }
    }, [regionFilter])

    const handleOnClick = (e: any, c: any) => {
        navigate(`country/${c.name}`, { state: c })
    }

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

    if (error) {
        return <p>Error: {error.message}</p>
    };

    return (
        <>
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
                                {regionFilter === "" && <InputLabel shrink={false} id="demo-simple-select-label" sx={{ paddingLeft: '0.5rem' }}>Filter by Region</InputLabel>}
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
                    <Grid container justifyContent="flex-start" spacing={8} mt={2}>
                        {countriesData.length > 0 ? countriesData.map((c: any) => (
                            <Grid item xs={3} md={3} lg={3}>
                                <CardActionArea onClick={(e) => handleOnClick(e, c)}>
                                    <Card variant="outlined" sx={{ minHeight: 430 }}>
                                        <CardMedia
                                            sx={{ height: 240, backgroundCover: 'cover' }}
                                            image={c.flags.png}
                                            title={c.flags.alt}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" fontWeight={600} component="div">
                                                {c.name}
                                            </Typography>
                                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">
                                                Population: <Typography gutterBottom variant="body2" component="span">{c.population}</Typography>
                                            </Typography>
                                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">
                                                Region: <Typography gutterBottom variant="body2" component="span">{c.region}</Typography>
                                            </Typography>
                                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">
                                                Capital: <Typography gutterBottom variant="body2" component="span">{c.capital}</Typography>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                        ))
                            :
                            <Loader loading={true} />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;