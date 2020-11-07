import {inject, Provider} from 'mobx-react';
import React, {useState} from "react";
import SignUpStore from '../../components/signup/SignUpStore';
import SignUp from '../../components/signup/SignUp';
import PropTypes from 'prop-types';
import Layout from "../../layout/Layout";

function Signup({AppStore}) {
    const [Store] = useState(new SignUpStore());
    return (
        <Provider SignInStore={Store}>
            <Layout hideBar isDark>
            <SignUp />
            </Layout>
        </Provider>
    )
}

Signup.propTypes = {
    AppStore: PropTypes.object.isRequired
}

export default inject('AppStore')(Signup);
