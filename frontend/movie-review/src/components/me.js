import {React} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Box, Typography} from '@material-ui/core';
import UserReviewList from "./userReviews";

const useStyles = makeStyles((theme) => ({
    poster: {
        maxWidth: 250,
        margin: 20,
        display: "inline-block",
        [theme.breakpoints.down('xs')]: {
            maxWidth: "80%"
        }
    },
    box: {
        [theme.breakpoints.down('xs')]: {
            flexWrap: "wrap"
        }
    },
    text: {
        color: "#AEB7BF",
        paddingTop: 10
    },
    btn: {
        margin: 25,
        fontWeight: "bolder",
        background: "#164773",
        color: "#AEB7BF",
    },
    avatar: {
        margin: 20,
        height: 200,
        width: 200
    },
    container: {
        width: "100%",
        margin: "auto",
        background: '#122640',
    },
}));

function toDate(date) {
    return (new Date(date)).toDateString();
}

export default function Me() {
    const classes = useStyles();  
    var user = JSON.parse(window.localStorage.getItem("user"));

    function logOut() {
        window.localStorage.clear();
        window.location.href = "/";
    }

        return (
           
            <div className={classes.container}>
                <Box display="flex" className={classes.box} justifyContent="flex-start"  p={1}>
                    <Box p={1}>
                        <Avatar alt="Profile Avatar" src = "" className={classes.avatar}></Avatar>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h5" gutterBottom className={classes.text}></Typography>
                    <Typography variant="h5" gutterBottom className={classes.text}>{user ? user.firstName + " " + user.lastName : ""}</Typography>
                        <Typography variant="h5" gutterBottom className={classes.text}></Typography>
                        <Typography variant="h5" gutterBottom className={classes.text}>{user ? user.email : ""}</Typography>
                        <Typography variant="h5" gutterBottom className={classes.text}></Typography>
                        <Typography variant="h5" gutterBottom className={classes.text} > Joined @ {user ? toDate(user.joinDate) : ""}</Typography>
                    </Box>
                </Box>
                <Box display="flex" className={classes.box} justifyContent="flex-start" m={1} p={1}>
                    <Box p={1}>
                        <Button variant="contained" onClick={logOut} className={classes.btn}>Log Out</Button>
                    </Box>
                </Box>
                <Box display="flex" className={classes.box} justifyContent="flex-start" m={1} p={1}>
                    <Box p={1}>
                        {
                            user ? <UserReviewList id={user._id} /> : ""
                         }
                    </Box>
                </Box>
            </div>
        );
    
}