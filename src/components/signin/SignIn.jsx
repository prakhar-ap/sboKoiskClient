import {inject, observer} from "mobx-react";
import {Card, Grid, Button, Checkbox} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import TextFieldWrapper from "../common/wrappers/TextFieldWrapper";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    textfield: {
        height: 25,
        border: "none",
        borderColor: "gray"
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
        <div className="SignIn">
            <Grid className="signinForm">
                <form className="form" noValidate autoComplete="off">
                    <Grid container spacing={2} className={'signinInfo'}>
                        <Grid item xs={2}/>
                        <Grid container spacing={4} item xs={8}>
                            <Card className={'formDetails'}>
                                <Grid item xs={12}>
                                    <TextFieldWrapper
                                        name={"email"}
                                        value={form.email}
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        onChange={_handleChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldWrapper
                                        name="password"
                                        label="Password"
                                        value={form.password}
                                        autoComplete="current-password"
                                        variant="outlined"
                                        onChange={_handleChange}
                                        type="password"/>
                                </Grid>

                                <Grid item xs={6}>
                                    <Checkbox
                                        checked={form.rememberMe}
                                        onChange={_handleCheck}
                                        name="rememberMe" />
                                    <span className={'rememberMe'}>Remember Me?</span>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        disabled={!isFormFilled}
                                        onClick={() => handleSubmit(AppStore)}>
                                        LOGIN
                                    </Button>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
}

SignIn.propTypes = {
    AppStore: PropTypes.object.isRequired,
    SignInStore: PropTypes.object.isRequired
}

export default inject('AppStore', 'SignInStore')(observer(SignIn));
