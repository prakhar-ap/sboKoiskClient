import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const light = theme => ({
    root: {
        fontSize: '0.7rem',
        backgroundColor: 'white',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        '& icon': {
            backgroundColor: 'black',
        }
    },
});

const dark = theme => ({
    root: {
        fontSize: '0.7rem',
        backgroundColor: '#333',
        color: 'whitesmoke',
        boxShadow: '0px 1px 5px 0px #FFFFFF',
        '& icon': {
            backgroundColor: 'whitesmoke',
        },
    },
});


class SelectWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
        };
    }

    render() {
        const disabled = this.props.children.length === 1 ? true : this.props.disabled;
        const value =
            this.props.children.length === 1
                ? this.props.children[0].props.value
                : this.props.value;
        const classes = !this.props.isDark ? light() : dark();
        const { label } = this.props;
        const textField = (
            <TextField
                name={this.props.name}
                value={value}
                className={this.props.className}
                error={!!this.state.errorText}
                helperText={this.state.errorText}
                onChange={this.props.onChange}
                SelectProps={this.props.SelectProps}
                InputProps={{
                    style: classes.root,
                }}
                disabled={disabled}
                variant="outlined"
                size={"small"}
                color={this.props.color}
                fullWidth={true}
                select>
                {this.props.children}
            </TextField>
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

SelectWrapper.propTypes = {
    onChange: PropTypes.func,
    required: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    SelectProps: PropTypes.object,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    hideOptional: PropTypes.bool,
    tooltipText: PropTypes.string,
    tooltipPlacement: PropTypes.string,
    isDark: PropTypes.bool,
    className: PropTypes.string
};

export default SelectWrapper;
