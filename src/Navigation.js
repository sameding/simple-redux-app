import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute'
import { Home, Login } from './pages';

// The Navigation component renders one of the provided
// Routes (provided that one matches). Both the /account, /segment
// and /schedule routes will match any pathname that starts
// with /account, /segment or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Navigation = ( props ) => (
    <main className="active-container">
        <Switch>
            <PrivateRoute exact path="/" component={Home}/>


            <Route path="/login" component={Login}/>
            
            <PrivateRoute path="*" component={Home} />
        </Switch>
    </main>
)

export default Navigation;
