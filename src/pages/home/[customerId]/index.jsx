import {inject, observer, Provider} from 'mobx-react';
import React from "react";
import CustomerDetailsStore from '../../../components/home/details/CustomerDetailsStore';
import Layout from "../../../layout/Layout";
import PropTypes from 'prop-types';
import Base from "../../../base/Base";
import AppController from "../../../base/App.controller";
import CustomerDetail from "../../../components/home/details/CustomerDetail";

class Details extends Base {
    state = {
        Store: new CustomerDetailsStore(),
    }

    static async getInitialProps({req, res}) {
        const controller = new AppController(req, res);
        const props = controller.getInitialProps();

        if (req && !req?.query?.customerId) {
            res.redirect('/home');
        }

        return props;
    }

    static getDerivedStateFromProps(props, state) {
        state.Store.setCustomerId(props.location.pathname.split('/')[2]);

        return state;
    }

    render() {
        return (
            <Provider CustomerDetailsStore={this.state.Store}>
                <Layout hideBar>
                    <CustomerDetail/>
                </Layout>
            </Provider>
        )
    }
}

Details.propTypes = {
    AppStore: PropTypes.object.isRequired
};

export default inject('AppStore')(observer(Details));