import * as React from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, CssBaseline, } from '@material-ui/core';
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


export default function Signup() {

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const newUser = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),

        }

        console.log("req body : " + JSON.stringify(newUser));

        fetch(baseUrl + "users/signup", {
            method: "POST",
            body: JSON.stringify(newUser),
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
            .then(response => response.json())
            .then(alert("Signed Up"))
            .catch(error => { console.log(error.message); alert('Unsuccess Sign Up\nError: ' + error.message); });

    };

    return (

        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
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
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justifyContent="flex-end">
                        <Grid item sx={{ mt: 10, mb: 2 }}>
                            <Link href="/signin" variant="body2" >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}