import { React, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from "../shared/baseUrl";
import { Typography, Link, List, ListItem, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    list: {
        background: '#122640',
        color: '#AEB5BF',
        margin: 30,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 10
        }
    },
    heading: {
        fontSize: 30,
        color: "#AEB5BF",
        margin: 45
    },
    text: {
        fontSize: 20,
        margin: 15,
        color: "#AEB5BF"
    },
    poster: {
        maxWidth: 50
    },
    box: {
        fontSize: 20,
        margin: 15,
        [theme.breakpoints.down('xs')]: {
            display: "none"
        }
    },
    link: {
        textDecoration: "none"
    },
    btn: {
        margin: 20,
        fontWeight: "bolder",
        [theme.breakpoints.down('sm')]: {
            padding: 5,
        },
        background: "#164773",
        color: '#AEB7BF'
    },
}));

export default function UserReviewList(props) {
    const [movieReviews, setMovieRevies] = useState(0);
    const [castReviews, setCastRevies] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        fetch(baseUrl + "movie-review/" + JSON.parse(window.localStorage.getItem("user"))._id + "/list",
            {
                headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
            })
            .then(response => response.json())
            .then(response => setMovieRevies(response))
            .catch(() => window.location.href = "/");

        fetch(baseUrl + "cast-review/" + JSON.parse(window.localStorage.getItem("user"))._id + "/list",
            {
                headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
            })
            .then(response => response.json())
            .then(response => setCastRevies(response))
            .catch(() => window.location.href = "/");



    }, [])

    return (

        <div>
            <Typography className={classes.heading}>Movie Reviews:</Typography>
            <List component="nav" className={classes.list}>
                {movieReviews ? movieReviews.map(review => (
                    <ListItem button>
                        <Typography className={classes.text}>{review.content}</Typography>
                        <Typography className={classes.box}><Rating name="rating" readOnly value={parseInt(review.rating)} /></Typography>
                        <Link href={"/movie/" + review.movieId} className={classes.link} >
                            <Button className={classes.btn}>Movie Details</Button>
                        </Link>
                    </ListItem>
                )) : ""}
            </List>

            <Typography className={classes.heading}>Cast Reviews:</Typography>
            <List component="nav" className={classes.list}>
                {castReviews ? castReviews.map(review => (
                    <ListItem button>
                        <Typography className={classes.text}>{review.content}</Typography>
                        <Typography className={classes.box}><Rating name="rating" readOnly value={parseInt(review.rating)} /></Typography>
                        <Link href={"/people/" + review.personId} className={classes.link} >
                            <Button className={classes.btn}>Cast Details</Button>
                        </Link>
                    </ListItem>
                )) : ""}
            </List>
        </div>
    );
}