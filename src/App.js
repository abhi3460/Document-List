import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import DocumentList from './components/DocumentList';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={Home}></Route>
                <Route exact path={"/document-list"} component={DocumentList}></Route>
            </Switch>
        </Router>
    )
}

export default App;