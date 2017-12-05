import React, { Component } from 'react';
import axios from 'axios';
import auth from '../auth';

import './Dictionary.css';

const API_URL = 'http://1.lobarev.com/api/dictionary/';

const dictionaries = ['ru_general', 'ru_difficult', 'ru_adult', 'en_easy', 'en_middle'];


const unique = (array) => {
    const obj = {};
    for(let i=0; i<array.length; i++) {
        obj[array[i]] = true;
    }
    return Object.keys(obj);
};

class Dictionary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current_dictionary: 'ru_general',
            words: [],
            new_words: [],
            unique_words: [],
            isLoading: false
        };

        this.onWordsChange = this.onWordsChange.bind(this);
        this.onNewWordsChange = this.onNewWordsChange.bind(this);
        this.onDictionaryChange = this.onDictionaryChange.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    componentDidMount() {
        this.props.isLogged && this.getDictionary(this.state.current_dictionary);
    }

    onDictionaryChange(e) {
        const current_dictionary = e.target.value;
        this.setState({
            current_dictionary
        });

        this.getDictionary(current_dictionary);
    }

    getDictionary(name) {
        axios.get(API_URL + name)
            .then(response => {
                const words = unique(response.data);
                this.setState({
                    words,
                    unique_words: words
                });
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    onNewWordsChange(e) {
        const value = e.target.value.split('\n');

        this.setState({
            new_words: value
        });

        this.updateUniqueWords();
    }

    onWordsChange(e) {
        const value = e.target.value.split('\n');

        this.setState({
            words: value
        });

        this.updateUniqueWords();
    }

    updateUniqueWords() {
        this.setState(prevState => ({
            unique_words: unique([
                ...prevState.words,
                ...prevState.new_words.filter(word => word !== '')
            ])
        }));
    }

    onSaveClick() {
        if(this.state.isLoading) {
            return false;
        }

        this.setState({
            isLoading: true
        });

        axios({
                url: API_URL + this.state.current_dictionary,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: {
                    words: JSON.stringify(this.state.unique_words)
                }
            })
            .then(response => {
                console.log(response);
                this.setState(prevState => ({
                    words: prevState.unique_words,
                    new_words: [],
                    isLoading: false
                }));
            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    isLoading: false
                });
            });
    }

    render() {
        const words = this.state.words.join('\n');
        const new_words = this.state.new_words.join('\n');

        let new_unique_words = [...this.state.unique_words];
        new_unique_words.splice(0, this.state.words.length);

        return (
            <div className="Dictionary">
                <div className="Dictionary-header">
                    <select value={this.state.current_dictionary} onChange={this.onDictionaryChange}>
                        {dictionaries.map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="Dictionary-row Dictionary-main">
                    <div className="Dictionary-col">
                        <h4 className="Dictionary-colTitle">Words ({this.state.words.length})</h4>
                        <textarea onChange={this.onWordsChange} value={words} className="Dictionary-wordsArea" />
                    </div>
                    <div className="Dictionary-col">
                        <h4 className="Dictionary-colTitle">New Words ({this.state.new_words.length})</h4>
                        <textarea onChange={this.onNewWordsChange} value={new_words} className="Dictionary-wordsArea" />
                    </div>
                    <div className="Dictionary-col">
                        <h4 className="Dictionary-colTitle">New Unique Words ({new_unique_words.length})</h4>
                        <div className="Dictionary-wordsArea Dictionary-wordsArea--static">
                            {new_unique_words.map((word, i) => (
                                <div key={i}>{word}</div>
                            ))}
                        </div>
                    </div>
                    <div className="Dictionary-col">
                        <h4 className="Dictionary-colTitle">Unique Words ({this.state.unique_words.length})</h4>
                        <div className="Dictionary-wordsArea Dictionary-wordsArea--static">
                            {this.state.unique_words.map((word, i) => (
                                <div key={i}>{word}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="Dictionary-buttons">
                    <button className="btn btn--s btn--green" onClick={this.onSaveClick}>
                        {this.state.isLoading ? 'Saving...' : 'Save Words'}
                    </button>
                </div>
            </div>
        );
    }
}

export default Dictionary;
