import{ React, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextareaAutosize, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: 30,
        color: "#AEB7BF",
        margin: 15
    },
    rating: {
        marginLeft: 75,
        marginRight: 100,
    },
    reviewBox: {
        maxWidth: 700,
        fontSize: 20,
        fontWeight: "bolder",
        width: "250%",
        background: "#1B3659",
        border: "none",
        padding: 15,
        color: "#AEB7BF",
        borderRadius: 30,
        letterSpacing: 1,
        wordSpacing: 7,
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        '&:focus': {
            outline: "none"
        }
    },
    postButton: {
        background: "transparent",
        border: "2px solid white",
        color: "#AEB7BF",
        fontWeight: "bolder",
        borderRadius: 17,
        marginLeft: 200,
    },
    disabledButton: {
        borderColor: "#AEB7BF"
    }
}));

function postReview(rating,review) {
    var id = window.location.pathname.substring(7);
    /*fetch("https://popcritic.herokuapp.com/"+type+"/"+id+"/reviews",{method: "POST", body: JSON.stringify({ rating, review }), headers: {'Content-Type': "application/json", token: window.localStorage.getItem("token")}}).then(x=>x.text()).then(function() {
        window.location.reload();
    }).catch(console.log); */
    const newReview = {
        movieId: id,
        authorId:"17889c734aa50a7a7d34928",
        content:review, 
        rating:rating
    }
   alert(JSON.stringify(newReview));
  }

export default function PostReview() {
    const classes = useStyles();
    const [review, setReview] = useState(window.localStorage.getItem("review") || "");
    const [rating, setRating] = useState(5);

    return (
        <div>
            <Typography className={classes.heading}>Post Review</Typography>
            <TextareaAutosize value={review}  onChange={ (e) => setReview(e.target.value)} maxLength={300} className={classes.reviewBox} boxshadow = {3} minRows={6} placeholder="Write Your Review Here ..." />
            <Rating button value={rating} onChange={ (e,rtg) => setRating(rtg) } className={classes.rating} />
            <Button className={classes.postButton} onClick={ () => postReview(rating,review) }>Post Review</Button>
        </div>
    );
}