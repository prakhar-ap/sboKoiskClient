import {inject, observer} from "mobx-react";
import React from "react";
import PropTypes from 'prop-types';

function CustomerDetail({AppStore, CustomerDetailsStore}) {
    return (
        <div>
            Dummy Details Page
        </div>
    )
}

CustomerDetail.propTypes = {
    AppStore: PropTypes.object.isRequired,
    CustomerDetailsStore: PropTypes.object.isRequired
}

export default inject('AppStore', 'CustomerDetailsStore')(observer(CustomerDetail));