import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FormWrapper extends Component {
    onSubmit = (event) => {
        const { onSubmit, isValid } = this.props;

        if (event.keyCode === 13 && isValid) {
            event.preventDefault();
            onSubmit(event);
        }
    };

    render() {
        return (
            <form
                onSubmit={(event) => event.preventDefault()}
                className={this.props.className}
                ref={this.props.formRef}
                onKeyDown={this.onSubmit}>
                {this.props.children}
            </form>
        );
    }
}

FormWrapper.propTypes = {
    formRef: PropTypes.object.isRequired,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    children: PropTypes.node.isRequired,
    isValid: PropTypes.bool.isRequired,
};

export default FormWrapper;
