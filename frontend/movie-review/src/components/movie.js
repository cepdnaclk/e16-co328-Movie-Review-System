import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Breadcrumbs, Link} from "@material-ui/core";
import PostReview from "./postReview";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        margin: "auto",
        background: '#122640',
    },
    title: {
        color: "#AEB7BF",
        paddingTop: 10
    },
    date: {
        color: "#AEB7BF"
    },
    plot: {
        color: "#AEB7BF",
        paddingTop: 10
    },
    button: {
        margin: 10,
        fontWeight: "bolder"
    },
    poster: {
        maxWidth: 250,
        margin: 20,
        display: "inline-block",
        [theme.breakpoints.down('xs')]: {
            maxWidth: "80%"
        }
    },
    box: {
        [theme.breakpoints.down('xs')]: {
            flexWrap: "wrap"
        }
    },
    link: {
        color: "#AEB7BF",
        padding: 10
    },
    list: {
        display: 'inline-block'
    },
    people: {
        maxWidth: 150,
        margin: 15,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 60
        }
    },
    breadcrumb: {
        color: "#AEB7BF",
        marginLeft: 10,
    }
}));

function toDate(date) {
    return (new Date(date)).toDateString();
}

export default function Movie() {

    const classes = useStyles();
    const [movie, setMovie] = useState(0);

    useEffect(() => {
        var query = window.location.pathname.substring(7);
        fetch("http://www.omdbapi.com/?apikey=ed0c7d3d&plot=full&i=" + query)
            .then(response => response.json())
            .then(response => setMovie(response))
            .catch(() => { window.location.href = "/" });
    }, [])

    return (
        console.log({ movie }),
        <div className={classes.container}>
            <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
                <Link underline="hover"  className={classes.breadcrumb} href="/">
                    Home
                </Link>
                <Typography >Movie</Typography>
            </Breadcrumbs>
            <Box display="flex" className={classes.box} justifyContent="flex-start">
                <Box p={1}>
                    <img className={classes.poster} src={movie ? (movie.Poster) : "https://via.placeholder.com/400x600"} alt={movie.Title} />
                </Box>
                <Box p={1}>
                    <Typography variant="h3" gutterBottom className={classes.title}>{movie ? movie.Title : ""}</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.date}>{movie ? toDate(movie.Released) : ""}</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.plot}>{movie ? movie.Plot : ""}</Typography>
                    <Typography variant="h5" gutterBottom className={classes.title}>Director:</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.title}>{movie ? movie.Director : ""} </Typography>
                    <Typography variant="h5" gutterBottom className={classes.title}>Cast:</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.title}>{movie ? movie.Actors : ""} </Typography>
                </Box>
            </Box>

            <Box display="flex" className={classes.box} justifyContent="flex-start">
                <Box p={1}>

                    <PostReview type="movie" />
                    {/*  <Typography> post reviews and review list gose here</Typography>
                   <ReviewList type="movie" />*/}
                </Box>
            </Box>
        </div>
    );

}