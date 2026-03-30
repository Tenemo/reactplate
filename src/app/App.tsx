import 'normalize.css';

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
    const themeClassName = appTheme === 'dark' ? 'theme-dark' : 'theme-light';

    useEffect(() => {
        document.documentElement.classList.remove('theme-dark', 'theme-light');
        document.documentElement.classList.add(themeClassName);
    }, [themeClassName]);

    return (
        <div className={styles.app}>
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
