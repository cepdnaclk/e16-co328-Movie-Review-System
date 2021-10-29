import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, List, Link } from "@material-ui/core";
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
    const [cast, setCast] = useState(0);



    useEffect(() => {
        var query = window.location.pathname.substring(7);
        fetch("https://api.themoviedb.org/3/movie/" + query + "?api_key=bb78e4cf3442e302d928f2c5edcdbee1")
            .then(response => response.json())
            .then(response => setMovie(response))
            .catch(() => { window.location.href = "/" });

        fetch("https://api.themoviedb.org/3/movie/" + query + "/credits?api_key=bb78e4cf3442e302d928f2c5edcdbee1")
            .then(response => response.json())
            .then(response => {
                if ((response.cast).length > 15) {
                    setCast((response.cast).slice(0, 15));
                }
                else {
                    setCast(response.cast);
                }
            })
            .catch(() => { window.location.href = "/" });

    }, [])




    return (
        console.log(cast),
        <div className={classes.container}>
            <Box display="flex" className={classes.box} justifyContent="flex-start">
                <Box p={1}>
                    <img className={classes.poster} src={movie ? ("https://image.tmdb.org/t/p/w500" + movie.poster_path) : "https://via.placeholder.com/400x600"} alt={movie.Title} />
                </Box>
                <Box p={1}>
                    <Typography variant="h3" gutterBottom className={classes.title}>{movie ? movie.title : ""}</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.date}>{movie ? toDate(movie.release_date) : ""}</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.plot}>{movie ? movie.overview : ""}</Typography>
                    <Typography variant="h5" gutterBottom className={classes.title}>Casts:</Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.title}>
                        {cast ? cast.map(person => <Link href={"/people/" + person.id} className={classes.link}>{person.name}</Link>) : ""}
                    </Typography>

                </Box>
            </Box>

            <Box display="flex" className={classes.box} justifyContent="flex-start" m={1} p={1}>
                <Box p={1}>
                    <Typography variant="h4" gutterBottom className={classes.title}>Cast:</Typography>
                    <List className={classes.list}>
                        {cast ? cast.map(person => (<Link href={"/people/" + person.id}><img className={classes.people} src={"https://image.tmdb.org/t/p/w500" + person.profile_path} alt={person.name} /></Link>)) : ""}
                    </List>
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