import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import auth from './auth';

import Header from './Header';
import Login from './login';
import Dictionary from './dictionary';
import Messages from './messages';

import './App.css';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogged: auth.isLogged(),
            onUpdateLogged: this.onUpdateLogged.bind(this)
        };

        this.routeRender = this.routeRender.bind(this);
        // this.onUpdateLogged = this.onUpdateLogged.bind(this);

    }

    onUpdateLogged() {
        this.setState({
            isLogged: auth.isLogged()
        });
    }

    routeRender(Comp, props) {
        return () => (<Comp {...props} />);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route render={(props) => (<Header {...this.state} location={props.location} />)} />

                    <Route exact path="/" render={this.routeRender(Login, {...this.state})} />
                    <Route path="/dictionary" render={this.routeRender(Dictionary, {...this.state})} />
                    <Route path="/messages" render={this.routeRender(Messages, {...this.state})} />
                </div>
            </Router>
        );
    }
}

export default App;
