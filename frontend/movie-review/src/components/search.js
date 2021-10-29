import { React, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import{Typography, List, ListItem, CircularProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        margin: "auto",
        background: '#122640',
      },
    list: {
        background: '#122640',
        color: 'white',
        padding: 30
    },
    heading: {
        fontSize: 30,
        color: "#AEB7BF",
        marginLeft: 20,
    },
    poster: {
        maxWidth: 50
    },
    date: {
        fontSize: 16,
        margin: 5,
        color: "#AEB7BF"
    },
    title: {
        fontSize: 20,
        margin: 15,
        color: "#AEB7BF"
    },
    breadcrumb: {
        color: "#AEB7BF",
        marginLeft: 10,
        marginBottom: 30,
        paddingTop: 10,
    },
    item:{
        color: "#AEB7BF",
    }
}));


export default function Search() {
    const classes = useStyles();
    const [movies, setMovies] = useState(0);
    const [query, setQuery] = useState(0);

    useEffect(() => {
        var query = window.location.pathname.substring(8);
        setQuery(decodeURIComponent(query));
        fetch("https://api.themoviedb.org/3/search/movie?api_key=bb78e4cf3442e302d928f2c5edcdbee1&language=en-US&page=1&query=" + query)
            .then(response => response.json())
            .then(response => setMovies(response.results));
    }, [])


    return (
        <div className={classes.container}>
            <Typography className={classes.heading}>{"Search Results For " + query}</Typography>
            <CircularProgress style={{ display: movies ? "none" : "block", margin: "20px auto" }} />
            <List component="nav" className={classes.list} aria-label="mailbox folders">
                {movies ? movies.map(movie => (  
                        <ListItem key={movie.id} button onClick={ () => window.location.href = "/movie/"+movie.id }>
                            <img src={movie.poster_path ? ("https://image.tmdb.org/t/p/w500"+movie.poster_path) : "https://via.placeholder.com/400x600"} alt = {movie.title} className={classes.poster} />
                            <Typography className={classes.title}>{movie.title}</Typography>
                            <Typography className={classes.date}>({movie.release_date ? movie.release_date.split("-")[0]  : ""})</Typography>
                        </ListItem>   
                )) : ""}
            </List>
        </div>
    );
}