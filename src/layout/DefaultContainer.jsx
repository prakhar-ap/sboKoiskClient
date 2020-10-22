import {Container} from "@material-ui/core";
import PropTypes from 'prop-types';
import React from "react";

function DefaultContainer({children, className}) {
    return (
        <Container
            maxWidth={'lg'}
            className={`DefaultContainer${(className && ' ' + className) || ''}`}>
            {children}
        </Container>
    )
}

DefaultContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default DefaultContainer;
