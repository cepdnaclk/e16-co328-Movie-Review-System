import {React, useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import{ Card, CircularProgress, Link, CardContent, CardMedia, Typography} from '@material-ui/core/';
import Rating from '@material-ui/lab/Rating';
// import { MOVIES } from "../shared/movies";


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
      
    },
    plot: {
      letterSpacing: 2,
      color: '#AEB5BF',
      marginTop: 10,
      marginBottom: 15,
      
    },
    title: {
        color: '#AEB5BF',
    }
  }));

  export default function Home(props) {
    const classes = useStyles();
    const [movies, setMovies] = useState(0);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=bb78e4cf3442e302d928f2c5edcdbee1")
        .then(response => {
            if(response.ok){
                return response;
            }
        } )
        .then(response => (response.json()))
        .then(response => response.results) // since used search to fetch movies
        .then((response) => setMovies(response));
      },[]) 

      return (
        
        <div className={classes.container}>
        <CircularProgress style={{ display: movies?"none":"block", margin: "20px auto" }} />
        { movies?movies.map(movie =>
         <Card className={classes.card} key={movie.id}>
             <CardMedia className={classes.media} image={"https://image.tmdb.org/t/p/w500"+movie.poster_path } title={ movie.title } />
             <CardContent>
               <Link href={ "/movie/" + movie.id } color="inherit" style={{ textDecoration: "none" }}>
               <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
               { movie.title }
               </Typography>
               </Link>
               <Typography variant="body2" component="p" className={classes.plot}>
               {movie.overview.slice(0,100) + "..." }
               </Typography>
               <Rating name = "readOnly" value={5} readOnly/>
             </CardContent>
         </Card>
        ):""}
        </div>
       );
  }