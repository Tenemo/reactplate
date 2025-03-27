import 'normalize.css';

import 'fonts/RobotoMono-Regular.woff2';
import 'fonts/RobotoMono-Regular.woff';

import { Helmet } from '@dr.pogodin/react-helmet';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import styles from './app.module.scss';

import { useAppSelector } from 'app/hooks';
import Header from 'components/Header/Header';
import NotFound from 'components/NotFound/NotFound';
import { selectAppTheme } from 'features/AppTheme/appThemeSlice';
import HomePage from 'features/HomePage/HomePage';

const App = (): React.JSX.Element => {
    const appTheme = useAppSelector(selectAppTheme);
    const classNames = `${styles.app} ${
        appTheme === 'dark' ? 'theme-dark' : 'theme-light'
    }`;

    useEffect(() => {
        document.documentElement.classList.remove('theme-dark', 'theme-light');
        document.documentElement.classList.add(
            appTheme === 'dark' ? 'theme-dark' : 'theme-light',
        );
    }, [appTheme]);

    return (
        <div className={classNames}>
            <Helmet>
                <title>reactplate</title>
            </Helmet>
            <ErrorBoundary
                fallback={
                    <div>
                        The application has crashed due to a rendering error.
                    </div>
                }
                onError={(error) => {
                    console.error(error);
                }}
            >
                <Header />
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<NotFound />} path="*" />
                </Routes>
            </ErrorBoundary>
        </div>
    );
};

export default App;
