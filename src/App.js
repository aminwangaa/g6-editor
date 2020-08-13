import React from 'react';
import 'antd/dist/antd.css';
import "./index.less"
import RouteList from "./route"
import {HashRouter as Router} from "react-router-dom"
import { stores } from './stores';
import { Provider } from 'mobx-react';

const App = () => {

    return (
        <Provider {...stores}>
            <Router>
                <RouteList />
            </Router>
        </Provider>
    )
}

export default App;
