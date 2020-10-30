import React, {Component} from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        fontSize: '0.7rem',
    },
});

class TextFieldWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: ''
        }
    }

    render() {
        const {label} = this.props;
        const classes = styles();

        const textField = (
            <TextField
                name={this.props.name}
                value={this.props.value}
                defaultValue={this.props.defaultValue}
                type={this.props.type}
                onChange={this.props.onChange}
                InputProps={{
                    style: classes.root
                }}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                variant={this.props.variant}
                color={this.props.color}
                multiline={this.props.multiline}
                rows={this.props.rows}
                autoComplete={this.props.autoComplete}
                size={"small"}
                fullWidth={true}
            />
        );

        if(label) {
            return (
                <div>
                    <div className="label">{label}</div>
                    {textField}
                </div>
            )
        }

        return textField;
    }
}

TextFieldWrapper.propTypes = {
    onChange: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    InputProps: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    customError: PropTypes.func,
    hideOptional: PropTypes.bool,
    tooltipText: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    autoComplete: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default TextFieldWrapper;
