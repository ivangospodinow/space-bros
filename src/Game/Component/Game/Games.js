import React, { Component } from 'react';

import { APP_VERSION, APP_STORE, APP_WIDTH, APP_HEIGHT } from '../../../Config';
import Game from '../../js/Game';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Games extends Component {
    game;
    componentDidMount() {
        const { type } = this.props;

        this.game = new Game(APP_STORE['assets']);
        this.game.run();
        this.game.startGame(type);

    }

    render() {

        return (
            <div className="fit-to-parent">
                <canvas id="canvas" width={APP_WIDTH} height={APP_HEIGHT} className="fit-to-parent"> </canvas>
                <Link to="/" style={{
                    position: 'fixed',
                    top: '2vw',
                    right: '2vw',
                    fontSize: '5vw',
                    textDecoration: 'none',
                }} className="color">Menu</Link>
            </div>
        );
    }
}

export default Games;
