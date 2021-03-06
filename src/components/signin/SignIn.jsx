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

function SignIn({AppStore, SignInStore}) {
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
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={_handleChange}
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
                        onChange={_handleChange}
                        className={classes.textField}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={classes.checkbox}
                                onClick={_handleCheck}
                                value="remember"
                                name="rememberMe"
                                color="primary" />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2"  style={{color: '#90caf9'}}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" style={{color: '#90caf9'}}>
                                {"Don't have an account? Sign Up"}
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

SignIn.propTypes = {
    AppStore: PropTypes.object.isRequired,
    SignInStore: PropTypes.object.isRequired
}

export default inject('AppStore', 'SignInStore')(observer(SignIn));
