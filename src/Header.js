import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import auth from './auth';
import './Header.css';


class Header extends Component {

    constructor(props) {
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        auth.logout();
        this.props.onUpdateLogged();
    }

    render() {
        return (
            <div className="Header">
                <div className="Header-right float--right">
                    {(this.props.isLogged)
                        ? <button className="btn btn--s btn--black" onClick={this.onLogoutClick}>Logout</button>
                        : (this.props.location.pathname !== '/' && <Redirect to='/' />)
                    }
                </div>
                <div className="Header-nav">
                    <NavLink to="/dictionary" activeClassName="is-active">Dictionaries</NavLink>
                    <NavLink to="/messages" activeClassName="is-active">Messages</NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
