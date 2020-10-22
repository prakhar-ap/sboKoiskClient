import {inject, Provider} from 'mobx-react';
import React, {useState} from "react";
import SignInStore from '../../components/signin/SignInStore';
import SignIn from '../../components/signin/SignIn';
import PropTypes from 'prop-types';

function Signin({AppStore}) {
    const [Store] = useState(new SignInStore());
    return (
        <Provider SignInStore={Store}>
            <SignIn/>
        </Provider>
    )
}

Signin.propTypes = {
    AppStore: PropTypes.object.isRequired
}

export default inject('AppStore')(Signin);
