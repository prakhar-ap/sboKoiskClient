import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Signin from "../pages/signin";
import Home from '../pages/home';
import Intro from '../pages/intro';
import Details from '../pages/customer';

class AppDrawer extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/intro"/>}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/home" component={Home}/>
                <Route path="/intro" component={Intro} />
                <Route path="/customer" component={Details} />
            </Switch>
        )
    }
}

export default AppDrawer;
