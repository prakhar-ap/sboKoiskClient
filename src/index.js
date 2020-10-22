import React from 'react'
import ReactDOM from 'react-dom'
import AppStore from "./AppStore";
import {Provider} from "mobx-react";
import './master.scss';
import App from './App';

ReactDOM.render(
    <Provider AppStore={AppStore}>
        <App />
    </Provider>
, document.getElementById('root'));
