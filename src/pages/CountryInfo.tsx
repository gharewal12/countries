import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";

const CountryInfo = () => {
    // 
    const location = useLocation();
    const navigate = useNavigate();

    const data: any = location.state;

    return (
        <Grid container spacing={4} padding={8}>
            <Grid item xs={12} md={12} lg={12}><Button variant="contained" startIcon={<ArrowBackIcon color="primary" />} size="large" onClick={() => navigate("/")} sx={{ minWidth: '8rem' }}><Typography color="primary" variant="body1">Back</Typography></Button></Grid>
            <Grid item xs={6} md={6} lg={6} mt={2}><img src={data.flags.png} alt={data.flags.alt} height={'350vh'} width={'550vh'} /></Grid>
            <Grid item xs={6} md={6} lg={6} >
                <Grid container padding={4}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5" fontWeight={900}> {data.name}</Typography>
                    </Grid>
                    <Grid container mt={2}>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Native Name
                                <Typography gutterBottom variant="body2" component="span">:{JSON.parse(data.nativeName)[Object.keys(JSON.parse(data.nativeName))[0]]?.common}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div"> Top Level Domain
                                <Typography gutterBottom variant="body2" component="span">:{data.tld}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Population
                                <Typography gutterBottom variant="body2" component="span">: {data.population}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Currencies
                                <Typography gutterBottom variant="body2" component="span">: {JSON.parse(data.currencies).name}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Region
                                <Typography gutterBottom variant="body2" component="span">: {data.region}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Languages
                                <Typography gutterBottom variant="body2" component="span">: {Object.values(JSON.parse(data.languages)).join(", ")}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Sub Region
                                <Typography gutterBottom variant="body2" component="span">: {data.subRegion}</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography gutterBottom variant="body1" fontWeight={500} component="div">Capital
                                <Typography gutterBottom variant="body2" component="span">: {data?.capital[0]}</Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} mt={8}>
                        <Grid container spacing={1} alignItems={"center"}>
                            <Grid item><Typography gutterBottom variant="body1" fontWeight={500} component="div">Border Countries:</Typography></Grid>
                            {data?.borders?.map((b: any) => <Grid item> <Button variant="contained" disabled size="small" sx={{ minWidth: '10vh' }}>{b}</Button></Grid>)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>)
}
export default CountryInfo;