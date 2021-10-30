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
    poster: {
        maxWidth: 50
    },
    avatar: {
        margin: 25
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

    if (props.type === "movie") {

        fetch(baseUrl + "movie-review/" + window.location.pathname.substring(7),
            {
                headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
            })
            .then(response => response.json())
            .then(response => setReviews(response))
            .catch()

    } else if (props.type === "people") {
        fetch(baseUrl + "cast-review/" + window.location.pathname.substring(8),
            {
                headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
            })
            .then(response => response.json())
            .then(response => setReviews(response))
            .catch();
    }

    return (

        <div>
            <Typography className={classes.heading}>Reviews</Typography>
            <List component="nav" className={classes.list}>
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