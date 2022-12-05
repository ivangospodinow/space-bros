import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import { APP_VERSION, APP_STORE } from '../../../Config';
import { imagePath } from '../../../Tools/Functions';

class Media extends Component {

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
                    left: '30%',
                    top: '50%',
                    transform: 'translate(0, -50%)',
                }} />

                <img src={imagePath(require('../../../Game/assets/turret-1.png'))} style={{
                    position: 'absolute',
                    right: '1vw',
                    top: '1vw',
                    transform: 'rotate(225deg)',
                }} />

                <img src={imagePath(require('../../../Game/assets/turret-1.png'))} style={{
                    position: 'absolute',
                    left: '1vw',
                    top: '1vw',
                    transform: 'rotate(135deg)',
                }} />

                <img src={imagePath(require('../../../Game/assets/turret-1.png'))} style={{
                    position: 'absolute',
                    left: '1vw',
                    bottom: '1vw',
                    transform: 'rotate(45deg)',
                }} />


                <img src={imagePath(require('../../../Game/assets/turret-1.png'))} style={{
                    position: 'absolute',
                    right: '1vw',
                    bottom: '1vw',
                    transform: 'rotate(-45deg)',
                }} />


                <img src={imagePath(require('../../../Game/assets/enemies.png'))} style={{
                    position: 'absolute',
                    left: '5%',
                    bottom: '1vw',
                }} />


                <img src={imagePath(require('../../../Game/assets/final-boss-media.png'))} style={{
                    position: 'absolute',
                    left: '71%',
                    top: '57%',
                    transform: 'translate(0, -50%)',
                }} />



                <span style={{
                    fontSize: '100px',
                    position: 'absolute',
                    top: '3vw',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                }} className="logo-text">Space</span>
                <span style={{
                    position: 'absolute',
                    bottom: '3vw',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                }} className="logo-text">Bros</span>



            </div >
        );
    }
}

export default Media;
