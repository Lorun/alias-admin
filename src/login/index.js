import React, { Component } from 'react';
import axios from 'axios';
import auth from '../auth';

import './Login.css';

const initialData = {
    email: '',
    password: '',
};

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: initialData,
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(e) {
        const email = e.target.value;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                email
            },
            errors: {}
        }));
    }

    onPasswordChange(e) {
        const password = e.target.value;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                password
            },
            errors: {}
        }));
    }

    onSubmit(e) {
        this.setState({
            isLoading: true
        });

        axios.post('http://1.lobarev.com/api/auth/login', {
                ...this.state.data
            })
            .then(response => {
                if(response.data.token) {
                    auth.login(response.data.token);

                    this.setState({
                        data: initialData,
                        isLoading: false
                    });

                    this.props.onUpdateLogged();
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });

                if(error.response.data) {
                    this.setState({
                        errors: error.response.data
                    });
                }
            });

        e.preventDefault();
    }

    render() {
        const errors = {};
        Object.keys(this.state.errors).map((type) => {
            errors[type] = <div style={{color: 'red'}}>{this.state.errors[type]}</div>;
            return true;
        });

        return (
            this.props.isLogged
                ?
                <div>Hello!</div>
                :
                <form className="Login" onSubmit={this.onSubmit}>
                    {errors['message']}
                    <div className="Login-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={this.state.data.email} onChange={this.onEmailChange} />
                        {errors['email']}
                    </div>
                    <div className="Login-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={this.state.data.password} onChange={this.onPasswordChange} />
                        {errors['password']}
                    </div>
                    <div className="Login-field">
                        <button type="submit">{this.state.isLoading ? 'Loading...' : 'Login'}</button>
                    </div>
                </form>
        );
    }
}

export default Login;
