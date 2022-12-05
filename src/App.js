import React, { Component } from 'react';
import {
  HashRouter as Router
} from "react-router-dom";

import './App.css';
import Content from './Game/Component/Content';

import { GAME_ASSETS, APP_STORE } from './Config';
import ScriptLoader from './Service/ScriptLoader';

import Assets from './Game/js/Assets';
import { imagePath } from './Tools/Functions';


const assets = new Assets();
GAME_ASSETS.forEach(function (pair) {
  assets.addImage(pair['name'], imagePath(require('./Game/' + pair['src'])['default']));
});

APP_STORE['assets'] = assets;

class App extends Component {
  state = {
    loaded: false,
  }

  componentDidMount() {

    assets.load(() => {
      this.setState({ loaded: true });
    });

  }

  render() {
    const {
      loaded,
    } = this.state;

    return (
      <Router>
        <div id="app">
          {loaded && <Content />}
          {!loaded && <div>Loading...</div>}
        </div>
      </Router >
    );
  }
}

export default App;