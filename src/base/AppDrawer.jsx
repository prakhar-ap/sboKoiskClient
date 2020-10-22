import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Signin from "../pages/signin";
import Home from '../pages/home';
import Intro from '../pages/intro';

class AppDrawer extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/intro"/>}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/home" component={Home}/>
                <Route path="/intro" component={Intro} />
            </Switch>
        )
    }
}

export default AppDrawer;
