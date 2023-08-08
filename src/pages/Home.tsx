//MUI
import Grid from "@mui/material/Grid";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";

const Home = ({ countriesData }: any) => {
    return (
        <Grid container justifyContent="flex-start" spacing={8} mt={2}>
            {countriesData.map((c: any) => (
                <Grid item xs={3} md={3} lg={3}>
                    <CardActionArea>
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
                                    Population: <Typography gutterBottom variant="body1" component="span">{c.population}</Typography>
                                </Typography>
                                <Typography gutterBottom variant="body1" fontWeight={500} component="div">
                                    Region: <Typography gutterBottom variant="body1" component="span">{c.region}</Typography>
                                </Typography>
                                <Typography gutterBottom variant="body1" fontWeight={500} component="div">
                                    Capital: <Typography gutterBottom variant="body1" component="span">{c.capital}</Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
        </Grid>
    )
}

export default Home;