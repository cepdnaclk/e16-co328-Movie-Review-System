import {React, useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import{ Card, CircularProgress, Link, CardContent, CardMedia, Typography} from '@material-ui/core/';
import Rating from '@material-ui/lab/Rating';
import { MOVIES } from "../shared/movies";


const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 250,
      margin: 20,
      display: "inline-block",
      background: '#1B3659',
      color: "white",
      [theme.breakpoints.down('xs')]: {
        maxWidth: "100%",
        marginLeft: 30,
        marginRight: 30
      }
    },
    container: {
      width: "100%",
      margin: "auto",
      background: '#122640',
    },
    media: {
      height: 375,
      filter: "brightness(0.7)"
    },
    plot: {
      letterSpacing: 2,
      color: '#AEB5BF',
      marginTop: 10,
      marginBottom: 15,
      
    }
  }));

  export default function Home(props) {
    const classes = useStyles();
    const [movies, setMovies] = useState(0);

    useEffect(() => {
        fetch("https://popcritic.herokuapp.com/movies", {mode: 'no-cors'})
        .then(response => {
            if(response.ok){
                return response;
            }
        } )
        .then(response => console.log(response))
        .then(setMovies(MOVIES));
      },[]) 

      return (
        <div className={classes.container}>
        <CircularProgress style={{ display: movies?"none":"block", margin: "20px auto" }} />
        { movies?movies.map(movie =>
         <Card className={classes.card} key={movie.movie_id}>
             <CardMedia className={classes.media} image={ "https://image.tmdb.org/t/p/w500" + movie.poster } title={ movie.title } />
             <CardContent>
               <Link href={ "/movie/" + movie.movie_id } color="inherit" style={{ textDecoration: "none" }}>
               <Typography gutterBottom variant="h5" component="h2">
               { movie.title }
               </Typography>
               </Link>
               <Typography variant="body2" component="p" className={classes.plot}>
               { movie.plot.slice(0,100) + "..." }
               </Typography>
               <Rating readOnly value={5} />
             </CardContent>
         </Card>
        ):""}
        </div>
       );
  }