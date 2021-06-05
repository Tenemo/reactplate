import React, { Component, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'normalize.css';
import { Helmet } from 'react-helmet-async';

import 'fonts/RobotoMono-Regular.woff2';
import 'fonts/RobotoMono-Regular.woff';

import { getAppTheme } from 'store/app/appSelectors';
import { RootState } from 'store/types';

import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'components/HomePage';

import styles from './app.scss';

type State = {
    hasError: boolean;
    error: Error | string | null;
    errorInformation?: { componentStack: string } | null;
};

type Props = {
    appTheme: string;
};

export class App extends Component<Props> {
    static getDerivedStateFromError = (): { hasError: boolean } => ({
        hasError: true,
    });

    readonly state: State = { hasError: false, error: null };

    componentDidCatch(
        error: Error | null,
        errorInformation: { componentStack: string },
    ): void {
        // eslint-disable-next-line no-console
        console.error(errorInformation.componentStack, error);
        this.setState({ error, errorInformation });
    }

    render(): ReactElement {
        const { hasError, error, errorInformation } = this.state;
        const { appTheme } = this.props;
        const classNames = `${styles.app} ${
            appTheme === 'dark' ? 'theme-dark' : 'theme-light'
        }`;
        return (
            <div className={classNames}>
                <Helmet>
                    <title>Reactplate</title>
                </Helmet>
                {hasError ? (
                    <div>
                        The application has crashed due to a rendering error.{' '}
                        <div className={styles.errorInfo}>
                            {JSON.stringify(error, null, 4)}
                            {JSON.stringify(errorInformation, null, 4)}
                        </div>
                    </div>
                ) : (
                    <>
                        <Header />
                        <Switch>
                            <Route component={HomePage} exact path="/" />
                            <Route component={NotFound} />
                        </Switch>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): { appTheme: string } => ({
    appTheme: getAppTheme(state),
});

export default connect(mapStateToProps)(App);
