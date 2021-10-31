import { React, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import { baseUrl } from "../shared/baseUrl";

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
    box: {
        fontSize: 20,
        margin: 15,
        [theme.breakpoints.down('xs')]: {
            display: "none"
        }
    }
}));

function toDate(date) {
    return (new Date(date)).toDateString();
}

export default function ReviewList(props) {
    const classes = useStyles();
    const [reviews, setReviews] = useState(0);
    //const [movieReviews, setMovieReviews] = useState(0);
    //const [castReviews, setCastReviews] = useState(0);
    const [ex1, setEx1] = useState(false);
    const [ex2, setEx2] = useState(false);


    var token = window.localStorage.getItem("token");


    if ((props.type === "movie") && token) {

        if (!ex1) {
            fetch(baseUrl + "movie-review/" + window.location.pathname.substring(7),
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            .then(response => {
                if (response.ok) {
                    setEx1(true);
                    return response;

                } else {
                    setEx1(true);
                    var error = new Error('error ' + response.status + ':' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    throw error;
                })
            .then(response => response.json())
            .then(response => setReviews(response))
            .catch(error => { console.log(error) });
        }


    }
    if ((props.type === "people") && token) {

        if (!ex2) {
            fetch(baseUrl + "cast-review/" + window.location.pathname.substring(8),
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(response => {
                    if (response.ok) {
                        setEx2(true);
                        return response;
                    } else {
                        setEx2(true);
                        var error = new Error('error ' + response.status + ':' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        throw error;
                    })
                .then(response => response.json())
                .then(response => setReviews(response))
                .catch(error => { console.log(error) });
        }

    }

    console.log("EX1: " + ex1);
    console.log("EX2: " + ex2);


    return (

        <div>
            <Typography className={classes.heading}>Reviews</Typography>

            <List component="nav" className={classes.list}>
                <Typography className={classes.text}>{token ? "" : "Please Log in to View Reviews . . ."}</Typography>
                {reviews ? reviews.map(review => (
                    <ListItem button>
                        <Typography className={classes.text}>{review.content}</Typography>
                        <Typography className={classes.box}><Rating name="rating" readOnly value={parseInt(review.rating)} /></Typography>
                        <Typography className={classes.text}>{"date:" + toDate(review.createDate)}</Typography>

                    </ListItem>
                )) : ""}
            </List>
        </div>
    );
}