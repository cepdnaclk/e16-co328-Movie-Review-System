import * as React from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, CssBaseline, } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from '../shared/baseUrl';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        margin: "auto",
        background: '#AEB7BF',
    },
    avatar: {
        margin: 10,
        color: 'black',
    },
}));


export default function Signin() {

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const user = {
            email: data.get('email'),
            password: data.get('password'),
        }

        console.log("req body: "+ JSON.stringify(user));


        fetch(baseUrl + "users/signin", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    throw error;
                }
            )
            .then(response =>  response.json())
            .then(response => {
                console.log(response.result);
                alert("Signed In");
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("user", JSON.stringify(response.result));
                window.location.href='/'})
            .catch(error => { console.log( error.message); alert('Unsuccess Sign Up\nError: ' + error.message); });





    };

    return (

        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: 30,
                }}
            >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 10, mb: 10 }}
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}