import React, { Component, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'normalize.css';
import { Helmet } from 'react-helmet-async';

import 'fonts/RobotoMono-Regular.woff2';
import 'fonts/RobotoMono-Regular.woff';

import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'components/HomePage';

import styles from './app.scss';

export class App extends Component {
    render(): ReactElement {
        return (
            <div className={styles.app}>
                <Helmet>
                    <title>Reactplate</title>
                </Helmet>
                <Header />
                <Switch>
                    <Route component={HomePage} exact path="/" />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
