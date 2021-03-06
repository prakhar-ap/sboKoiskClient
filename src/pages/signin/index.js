import {inject, Provider} from 'mobx-react';
import React, {useState} from "react";
import SignInStore from '../../components/signin/SignInStore';
import SignIn from '../../components/signin/SignIn';
import PropTypes from 'prop-types';
import Layout from "../../layout/Layout";

function Signin({AppStore}) {
    const [Store] = useState(new SignInStore());
    return (
        <Provider SignInStore={Store}>
            <Layout hideBar isDark>
            <SignIn />
            </Layout>
        </Provider>
    )
}

Signin.propTypes = {
    AppStore: PropTypes.object.isRequired
}

export default inject('AppStore')(Signin);
