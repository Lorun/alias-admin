import React, { Component } from 'react';
import axios from 'axios';

import './Messages.css';

const API_URL = 'http://5a058e1ff1ec990012528518.mockapi.io/feedback';


class Messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            isLoading: false
        };

        this.getMessages = this.getMessages.bind(this);
    }

    componentDidMount() {
        this.props.isLogged && this.getMessages();
    }

    getMessages() {

        axios.get(API_URL)
            .then((response) => {
                this.setState({
                    messages: response.data.reverse(),
                    isLoading: false
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                });
            });

    }


    render() {

        return (
            <div className="Messages">
                {this.state.messages.map((message) => (
                    <div key={message.id} className="Messages-item">
                        <div className="Messages-date">{new Date(message.createdAt*1000).toLocaleString('ru-RU')}</div>
                        <div className="Messages-email">{message.email}</div>
                        <div className="Messages-subject">{message.subject}</div>
                        <div className="Messages-text">
                            {message.message}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Messages;
