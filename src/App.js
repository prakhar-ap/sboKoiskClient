import React, { Component } from 'react';

import AppDrawer from "./base/AppDrawer";
import {BrowserRouter} from 'react-router-dom';
import CustomThemeProvider from "./layout/CustomThemeProvider";

class App extends Component {

    render() {
        return (
            <div className="App">
                <CustomThemeProvider>
                    <BrowserRouter>
                        <AppDrawer/>
                    </BrowserRouter>
                </CustomThemeProvider>
            </div>
        );
    }
}

export default App;
