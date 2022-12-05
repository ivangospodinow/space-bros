import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Menu from './Page/Menu';
import NewGame from './Game/NewGame';
import Challenge from './Game/Challenge';
import Credits from './Page/Credits';
import Logo from './Page/Logo';
import Media from './Page/Media';


class Content extends Component {

    render() {

        return (
            <div id="content" className="fit-to-parent">
                <Switch>
                    <Route path="/" exact>
                        <Menu />
                    </Route>
                    <Route path="/game/new" exact>
                        <NewGame />
                    </Route>
                    <Route path="/game/challenge" exact>
                        <Challenge />
                    </Route>
                    <Route path="/page/credits" exact>
                        <Credits />
                    </Route>
                    <Route path="/logo" exact>
                        <Logo />
                    </Route>
                    <Route path="/media" exact>
                        <Media />
                    </Route>
                </Switch>
            </div >
        );
    }
}

export default Content;
