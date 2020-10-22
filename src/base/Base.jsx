import {Component} from 'react'
import PropTypes from 'prop-types';

export default class Base extends Component {
    constructor(props) {
        super(props);

        const {AppStore, user} = this.props;

        AppStore.setUser(user);
    }
}

Base.propTypes = {
    AppStore: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};
