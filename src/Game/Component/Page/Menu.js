import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import { APP_VERSION } from '../../../Config';

class Menu extends Component {

    styles = {
        menuItem: {
            fontSize: '6vw',
            padding: '2.5vw 0',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'block',
        }
    };

    render() {

        return (
            <div id="menu" className="fit-to-parent color">
                <div style={{
                    textAlign: 'center',
                    fontSize: '10vw',
                    paddingTop: '5vw',
                }}>
                    Space Bros
                </div>

                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                }}>
                    <Link to="/game/new" style={this.styles.menuItem} className="color">New Game</Link>
                    <Link to="/game/challenge" style={this.styles.menuItem} className="color">Challenge</Link>
                    <Link to="/page/credits" style={this.styles.menuItem} className="color">Credits</Link>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '1vw',
                    left: '1vw',
                }} className="color">
                    v{APP_VERSION}
                </div>
            </div >
        );
    }
}

export default Menu;
