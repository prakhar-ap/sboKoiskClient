import {inject, observer} from "mobx-react";
import {Grid, Button, Checkbox} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "../common/Copyright";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#90caf9',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#90caf9',
        color: 'var(--dark-theme)',
        fontFamily: [
            '"Roboto"',
            '"Helvetica"',
            '"Arial"',
            'sans-serif',
        ].join(','),
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            backgroundColor: '#76a0c2'
        }
    },
    textField: {
        '& label': {
            color: '#dfe3f7',
        },
        '& label.Mui-focused': {
            color: '#90caf9',
        },
        '& input': {
            color: '#dfe3f7',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#333',
            },
            '&:hover fieldset': {
                borderColor: 'var(--ghost-white)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#90caf9',
            },
        },
    },
    checkbox: {
        color: 'grey'
    }
}));


function SignUp({AppStore, SignInStore}) {
    const {
        form,
        handleSubmit,
        updateField,
        isFormFilled
    } = SignInStore;

    const classes = useStyles();

    const _handleChange = (event) => {
        updateField(event.target.name, event.target.value);
    }

    const _handleCheck = (event) => {
        updateField(event.target.name, event.target.checked);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2} justify="space-evenly">
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="firstname"
                                label="First Name"
                                name="firstname"
                                type="text"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                name="lastname"
                                label="Last Name"
                                type="text"
                                id="lastname"
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        className={classes.textField}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        className={classes.textField}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={classes.checkbox}
                                value="remember"
                                color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs />
                        <Grid item>
                            <Link href="/signin" variant="body2" style={{color: '#90caf9'}}>
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

SignUp.propTypes = {
    AppStore: PropTypes.object.isRequired,
    SignInStore: PropTypes.object.isRequired
}

export default inject('AppStore', 'SignInStore')(observer(SignUp));
