import {inject,observer} from "mobx-react";
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

function Layout({AppStore, children}) {

    const prevTheme = localStorage.getItem('preferredTheme') ?
        localStorage.getItem('preferredTheme') === 'true' :
        true;

    useEffect(() => {
       AppStore.setTheme(prevTheme);
    }, []);

    const [theme, setTheme] = useState(prevTheme);

    const handleChangeTheme = (e) => {
        setTheme(!theme);
        localStorage.setItem('preferredTheme', !theme);
        AppStore.setTheme(!theme);
    }
    let theme_class = !theme ? 'baseLayout light' : 'baseLayout dark';
    let head = !theme ? 'topHead light': 'topHead dark';

    return (
        <div>
            <header className={head}>
                <Grid container justify={"space-between"} item xs={12}>
                    <Grid item xs={8}/>
                    <Grid item xs={2}>
                        <FormControlLabel
                            control={<Switch color="primary" checked={theme} onChange={handleChangeTheme} />}
                            label={!theme ? 'Light' : 'Dark'}
                            style={{margin: 0}}
                        />
                    </Grid>
                </Grid>
            </header>
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
    children: PropTypes.node
}

export default inject('AppStore')(observer(Layout))
