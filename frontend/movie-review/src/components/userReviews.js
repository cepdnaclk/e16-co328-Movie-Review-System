import {React, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from "../shared/baseUrl";

const useStyles = makeStyles((theme) => ({
    list: {
      background: '#121212',
      color: 'white',
      margin: 30,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 10
      }
    },
    heading: {
      fontSize: 30,
      color: "white",
      margin: 45
    },
    text: {
      fontSize: 20,
      margin: 15,
      color: "white"
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
    }
  }));

export default function UserReviewList (props){
    const [movies, setMovies] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        fetch(baseUrl + "movie-review/" +  JSON.parse(window.localStorage.getItem("user"))._id + "/list" ,{headers: {Authorization: 'Bearer ' + window.localStorage.getItem("token")}})
        .then(response => response.json())
        .then(response => setMovies(response))
        .catch(() => window.location.href="/");
      },[])

      return(
          <div>Movie Reviews</div>
      );
}