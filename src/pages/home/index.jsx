import {inject, observer, Provider} from 'mobx-react';
import React from "react";
import HomeStore from '../../components/home/HomeStore';
import HomeDashboard from '../../components/home/HomeDashboard';
import Layout from "../../layout/Layout";
import PropTypes from 'prop-types';
import Base from "../../base/Base";
import AppController from "../../base/App.controller";

class Home extends Base {
    state = {
        Store: new HomeStore(),
    }

    static async getInitialProps({req, res}) {
        const controller = new AppController(req, res);
        const props = controller.getInitialProps();

        return props;
    }

    render() {
        return (
            <Provider HomeStore={this.state.Store}>
                <Layout>
                    <HomeDashboard/>
                </Layout>
            </Provider>
        )
    }
}

Home.propTypes = {
    AppStore: PropTypes.object.isRequired
};

export default inject('AppStore')(observer(Home));
