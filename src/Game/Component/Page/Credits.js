import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import { APP_VERSION } from '../../../Config';

class Credits extends Component {

    styles = {

    };

    render() {

        return (
            <div className="fit-to-parent">
                <div id="credits" className="color" style={{
                    fontSize: '4vw',
                    lineHeight: '5.5vw',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                }}>
                    Developer<br />
                    &nbsp;&nbsp;Ivan Gospodinow<br />
                    &nbsp;&nbsp;ivangospodinow.com<br />
                    &nbsp;&nbsp;ivangospodinow@gmail.com<br />
                    <br />
                    <br />
                    Design<br />
                    &nbsp;&nbsp;tatermand<br />
                    &nbsp;&nbsp;opengameart.org/users/tatermand<br />
                    &nbsp;&nbsp;tatermand@gmail.com<br />
                    <br />
                    <br />
                    <span style={{
                        fontSize: '6vw'
                    }}>2016</span>
                </div>
                <Link to="/" style={{
                    position: 'fixed',
                    top: '2vw',
                    right: '2vw',
                    fontSize: '5vw',
                    textDecoration: 'none',
                }} className="color">Menu</Link>
            </div >
        );
    }
}

export default Credits;
