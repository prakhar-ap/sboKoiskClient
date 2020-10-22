import {inject,observer} from "mobx-react";
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

function Layout({AppStore, children}) {
    return (
        <div className="baseLayout">
            <Head>
                <title>Saarthi Business Solutions</title>
            </Head>
            <main className="content">
                <div className="toolbarOffset" />
                {children}
            </main>
        </div>
    )
}

Layout.propTypes = {
    AppStore: PropTypes.object.isRequired,
    children: PropTypes.node
}

export default inject('AppStore')(observer(Layout))
