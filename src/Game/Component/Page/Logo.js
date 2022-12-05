import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import { APP_VERSION, APP_STORE } from '../../../Config';
import { imagePath } from '../../../Tools/Functions';

class Logo extends Component {

    styles = {

    };

    render() {

        return (
            <div className="fit-to-parent color" style={{
                fontSize: '120px',
                textAlign: 'center',
            }}>
                <img src={imagePath(require('../../../Game/assets/background-dust-1.png'))} style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -58%)',
                }} />
                <img src={imagePath(require('../../../Game/assets/background-red-giant.png'))} style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-40%, -58%)',
                }} />

                <img src={imagePath(require('../../../Game/assets/ship_thrust.png'))} style={{
                    position: 'absolute',
                    left: '20%',
                    top: '50%',
                    transform: 'translate(0, -50%)',
                }} />


                <img src={imagePath(require('../../../Game/assets/ship_thrust.png'))} style={{
                    position: 'absolute',
                    left: '75%',
                    top: '50%',
                    transform: 'translate(0, -50%)',
                }} />

                <span style={{
                    fontSize: '100px',
                    position: 'absolute',
                    top: '10vw',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                }} className="logo-text">Space</span>
                <span style={{
                    position: 'absolute',
                    bottom: '10vw',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                }} className="logo-text">Bros</span>



            </div >
        );
    }
}

export default Logo;
