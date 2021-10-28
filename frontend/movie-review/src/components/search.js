import { React, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import{Typography, List, ListItem,Link, CircularProgress, Breadcrumbs} from '@material-ui/core';

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
        fetch("http://www.omdbapi.com/?apikey=ed0c7d3d&s=" + query)
            .then(response => response.json())
            .then(response => setMovies(response.Search));
    }, [])


    return (
        <div className={classes.container}>
            <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
                <Link underline="hover"  className={classes.breadcrumb} href="/">
                    Home
                </Link>
                <Typography >Search Results</Typography>
            </Breadcrumbs>
            <Typography className={classes.heading}>{"Search Results For " + query}</Typography>
            <CircularProgress style={{ display: movies ? "none" : "block", margin: "20px auto" }} />
            <List component="nav" className={classes.list} aria-label="mailbox folders">
                {movies ? movies.map(movie => (  
                        <ListItem key={movie.imdbID} button onClick={ () => window.location.href = "/movie/"+movie.imdbID }>
                            <img src={movie.Poster ? (movie.Poster) : "https://via.placeholder.com/400x600"} className={classes.poster} />
                            <Typography className={classes.title}>{movie.Title}</Typography>
                            <Typography className={classes.date}>({movie.Year ? movie.Year : ""})</Typography>
                        </ListItem>   
                )) : ""}
            </List>
        </div>
    );
}