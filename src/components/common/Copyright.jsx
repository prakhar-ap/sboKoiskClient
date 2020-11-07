import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="inherit" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Saarthi Back Office
            </Link>{' - '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;
