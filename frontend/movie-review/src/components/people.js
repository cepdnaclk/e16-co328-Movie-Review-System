import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, List, Link } from "@material-ui/core";
import PostReview from "./postReview";
import ReviewList from "./reviewList";

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
    role: {
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
    movies: {
        maxWidth: 150,
        margin: 15,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 60
        }
    },
}));

export default function People() {

    const classes = useStyles();
    const [person, setPeople] = useState(0);
    const [movies, setMovies] = useState(0);



    useEffect(() => {
        var query = window.location.pathname.substring(7);
        fetch("https://api.themoviedb.org/3/person/" + query + "?api_key=bb78e4cf3442e302d928f2c5edcdbee1")
            .then(response => response.json())
            .then(response => setPeople(response))
            .catch(() => { window.location.href = "/" });

        fetch("https://api.themoviedb.org/3/person/" + query + "/movie_credits?api_key=bb78e4cf3442e302d928f2c5edcdbee1")
            .then(response => response.json())
            .then(response => {
                if ((response.cast).length > 8) {
                    setMovies((response.cast).slice(0, 8));
                }
                else {
                    setMovies(response.cast);
                }
            })
            .catch(() => { window.location.href = "/" });

    }, [])




    return (

        <div className={classes.container}>
            <Box display="flex" className={classes.box} justifyContent="flex-start">
                <Box p={1}>
                    <img className={classes.poster} src={person ? ("https://image.tmdb.org/t/p/w500" + person.profile_path) : "https://via.placeholder.com/400x600"} alt={person.name} />
                </Box>
                <Box p={1}>
                    <Typography variant="h3" gutterBottom className={classes.title}>{person ? person.name : ""}</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.role}> {person ? person.known_for_department : ""} </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.plot}>{person ? person.biography : ""}</Typography>
                </Box>
            </Box>

            <Box display="flex" className={classes.box} justifyContent="flex-start" m={1} p={1}>
                <Box p={1}>
                    <Typography variant="h4" gutterBottom className={classes.title}>Movies:</Typography>
                    <List className={classes.list}>
                        {movies ? movies.map(movie => (<Link href={"/movie/" + movie.id}><img className={classes.movies} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} /></Link>)) : ""}
                    </List>
                </Box>
            </Box>

            <Box display="flex" className={classes.box} justifyContent="flex-start">
                <Box p={1}>

                    <PostReview type="people" />
                    <ReviewList type="people" />
                </Box>
            </Box>
        </div>
    );

}