import ThemeProvider from '@material-ui/styles/ThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import { getTheme } from '../themes';

const DefaultThemeProvider = ({ children }) => (
    <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
);

DefaultThemeProvider.propTypes = {
    AppStore: PropTypes.object,
    children: PropTypes.node,
    alt: PropTypes.bool,
};

export default DefaultThemeProvider;
