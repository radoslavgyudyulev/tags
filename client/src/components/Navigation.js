import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Tags from '../components/Tags';
import Stepper from '../components/Stepper';


export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact={true} component={Stepper} />
                    <Route path='/tags' exact={true} component={Tags} />
                </Switch>
            </div>
        );
    }
}
