import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Signin from "../pages/signin";
import Home from '../pages/home';
import Intro from '../pages/intro';
import Details from '../pages/home/[customerId]';
import NotFoundPage from '../pages/notfound';

class AppDrawer extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/intro"/>}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/intro" component={Intro} />
                <Route path="/customer" component={Details} />
                <Route
                    path="/home"
                    render={({ match: { url } }) => (
                        <>
                            <Route path={`${url}/`} component={Home} exact />
                            <Route path={`${url}/:customerId`} component={Details} />
                        </>
                    )}
                />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        )
    }
}

export default AppDrawer;
