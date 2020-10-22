import { createMuiTheme } from '@material-ui/core/styles';

export const getTheme = () => {
    const theme = require('./base');
    return createMuiTheme(theme);
}
