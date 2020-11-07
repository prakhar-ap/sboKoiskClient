import {inject,observer} from "mobx-react";
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const light = theme => ({
    root: {
        backgroundColor: '#32c5d2',
        minWidth: 'var(--windowsMinWidth)',
    },
});

const dark = theme => ({
    root: {
        backgroundColor: '#333',
        minWidth: 'var(--windowsMinWidth)',
    },
});

function Layout({AppStore, children, hideBar, isDark}) {

    const prevTheme = localStorage.getItem('preferredTheme') ?
        localStorage.getItem('preferredTheme') === 'true' :
        true;

    useEffect(() => {
       AppStore.setTheme(isDark ? isDark : prevTheme);
    }, []);

    const [theme, setTheme] = useState(isDark ? isDark : prevTheme);
    let theme_class = !theme ? 'baseLayout light' : 'baseLayout dark';
    const toolBar = !theme ? light() : dark();

    const handleChangeTheme = (e) => {
        setTheme(!theme);
        localStorage.setItem('preferredTheme', !theme);
        AppStore.setTheme(!theme);
    }

    return (
        <div>
            {!hideBar && <AppBar position="sticky" style={toolBar.root}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        SBO-Koisk
                    </Typography>
                    <Typography>
                        <IconButton style={{position: 'absolute', right: 80, top: 7}} onClick={handleChangeTheme}>
                            {theme ? <BrightnessHighIcon style={{color: 'white'}}/> :
                                <Brightness4Icon style={{color: 'white'}}/>}
                        </IconButton>
                    </Typography>
                    <Typography>
                        <Button onClick={() => AppStore.redirect(null, '/signin')} style={{position: 'absolute', right: 2, top: 13}} color="inherit">Logout</Button>
                    </Typography>
                </Toolbar>
            </AppBar>}
            <div className={theme_class}>
                <Head>
                    <title>Saarthi Business Solutions</title>
                </Head>
                <main className="content">
                    <div className="toolbarOffset" />
                    {children}
                </main>
            </div>
        </div>
    )
}

Layout.propTypes = {
    AppStore: PropTypes.object.isRequired,
    children: PropTypes.node,
    hideBar: PropTypes.bool,
    isDark: PropTypes.bool,
}

export default inject('AppStore')(observer(Layout))
