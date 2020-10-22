import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function PasswordField(
    name,
    onChange,
    value,
    label,
) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: {value},
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const passwordField = (
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <OutlinedInput
                type={values.showPassword ? 'text' : 'password'}
                value={value}
                onChange={() => onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )

    const withLabel = (
        <div>
            <div className="label">Here</div>
            {passwordField}
        </div>
    )

    return (
        <div>
            {label == null ? withLabel : passwordField}
        </div>
    );
}

PasswordField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
}
