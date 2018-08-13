import React, { Component } from 'react';
import ShortcutContainer from './containers/shortcut_container';
import BackDrop from './components/backdrop';
import Modal from './components/modal';
import Loader from './components/loader';
import axios from 'axios';
import * as storage from './services/storage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortcuts: [],
      url: '',
      showModal: false,
      modalMsg: '',
      loading: false
    };
  }

  componentDidMount() {
    const data = storage.get();
    data && this.setState({ shortcuts: data });
  }

  removeShortcut = id => {
    console.log('Remove card, id=', id);
    this.setState(
      prevState => ({
        shortcuts: [...prevState.shortcuts.filter(e => e.id !== id)]
      }),
      () => {
        storage.set(this.state.shortcuts);
        console.log('Wright to storage', this.state.shortcuts);
      }
    );
  };

  isValidURL = url => {
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regexp = new RegExp(expression);
    return regexp.test(url);
  };

  isExistURL(url) {
    return this.state.shortcuts.find(
      e => e.url.toLowerCase() === url.toLowerCase()
    );
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalMsg: ''
    });
  };

  getId() {
    return (
      '-' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  onChange = e => {
    this.setState({ url: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    const { url } = this.state;
    if (!this.isValidURL(url)) {
      this.setState({
        showModal: true,
        modalMsg: 'Non valid URL !!!'
      });
      return;
    }

    const url_get =
      'http://api.linkpreview.net/?key=5b6c3d7c248b91803742335a36a204b9df8ec6ff20a36&q=' +
      url;
    this.setState({
      loading: true
    });
    axios
      .get(url_get)
      .then(res => {
        if (this.isExistURL(res.data.url)) {
          this.setState({
            showModal: true,
            modalMsg: 'Duplicate shortcut !!!',
            loading: false
          });
          return;
        }
        this.setState(
          prevState => ({
            shortcuts: [
              { ...res.data, id: this.getId() },
              ...prevState.shortcuts
            ],
            url: '',
            loading: false
          }),
          () => {
            storage.set(this.state.shortcuts);
            console.log('Wright to storage', this.state.shortcuts);
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let value = this.state.url;
    console.log('Render App');

    return (
      <div className="App">
        <form onSubmit={this.submit}>
          <input
            className="input"
            type="text"
            placeholder="input URL..."
            value={value}
            onChange={this.onChange}
          />
          <input className="button" type="submit" value="Добавить" />
        </form>
        <hr />
        <ShortcutContainer
          shortcuts={this.state.shortcuts}
          remove={this.removeShortcut}
        />
        {this.state.showModal && (
          <BackDrop>
            <Modal msg={this.state.modalMsg} closeModal={this.closeModal} />
          </BackDrop>
        )}
        {this.state.loading && (
          <BackDrop>
            <Loader />
          </BackDrop>
        )}
      </div>
    );
  }
}

export default App;

//API key: 5b6c3d7c248b91803742335a36a204b9df8ec6ff20a36

//http://api.linkpreview.net/?key=5b6c3d7c248b91803742335a36a204b9df8ec6ff20a36&q=https://www.google.com
