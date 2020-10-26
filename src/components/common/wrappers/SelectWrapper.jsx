import { TextField } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
        const textField = (
            <TextField
                name={this.props.name}
                value={value}
                error={!!this.state.errorText}
                helperText={this.state.errorText}
                onChange={this.props.onChange}
                SelectProps={this.props.SelectProps}
                disabled={disabled}
                variant="outlined"
                size={"small"}
                color={this.props.color}
                fullWidth={true}
                select>
                {this.props.children}
            </TextField>
        );

        if (this.props.tooltipText) {
            return (
                <Tooltip
                    title={this.props.tooltipText}
                    placement={this.props.tooltipPlacement}
                    arrow>
                    {textField}
                </Tooltip>
            );
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
};

export default SelectWrapper;
