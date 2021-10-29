import { React, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, InputBase, Typography, Link } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = makeStyles((theme) => ({

    header: {
        flexGrow: 1,
    },
    bar: {
        background: '#051726'
    },
    title: {
        flexGrow: 1,
        color: "#D9CCB4",
        display: 'none',
        fontSize: 25,
        fontWeight: "bolder",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    login: {
        margin: 20,
        fontWeight: "bolder",
        [theme.breakpoints.down('sm')]: {
            padding: 5,
        },
        background: "#164773",
        color: '#AEB7BF'
    },
    search: {
        position: 'relative',
        borderRadius: 20,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchicon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#AEB7BF"
    },
    inputRoot: {
        color: 'inherit',
    },
    avatar: {
        marginRight: 20,
        border: "2px solid white"
    },
    user: {
        margin: 25
    },
    gh: {
        color: "white",
        margin: 15,
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    const classes = useStyle();
    const [value, setValue] = useState(0);

    function search(e) {
        if (e.keyCode === 13) window.location.href = "/search/" + value
    }


    return (
        <div className={classes.header}>
            <AppBar position='static' className={classes.bar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        MOVIE REVIEW
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchicon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Movie"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={search}
                        />
                    </div>
                    <Link href="/login">
                    <Button variant="contained" className={classes.login} >Log In</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>




    );

}