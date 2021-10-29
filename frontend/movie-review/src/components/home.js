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
        fetch("http://www.omdbapi.com/?s=har&apikey=ed0c7d3d&page=1")
        .then(response => {
            if(response.ok){
                return response;
            }
        } )
        .then(response => (response.json()))
        .then(response => response.Search) // since used search to fetch movies
        .then((response) => setMovies(response));
      },[]) 

      return (
        <div className={classes.container}>
        <CircularProgress style={{ display: movies?"none":"block", margin: "20px auto" }} />
        { movies?movies.map(movie =>
         <Card className={classes.card} key={movie.imdbID}>
             <CardMedia className={classes.media} image={movie.Poster } title={ movie.Title } />
             <CardContent>
               <Link href={ "/movie/" + movie.imdbID } color="inherit" style={{ textDecoration: "none" }}>
               <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
               { movie.Title }
               </Typography>
               </Link>
               <Typography variant="body2" component="p" className={classes.plot}>
               
               </Typography>
               <Rating name = "readOnly" value={5} readOnly/>
             </CardContent>
         </Card>
        ):""}
        </div>
       );
  }