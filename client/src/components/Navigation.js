import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import TagsPage from '../components/TagsPage/TagContainer';
import LandingPage from '../components/LandingPage/LandingPage';


export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact={true} component={LandingPage} />
                    <Route path='/tags' exact={true} component={TagsPage} />
                </Switch>
            </div>
        );
    }
}
