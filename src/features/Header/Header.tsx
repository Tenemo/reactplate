import React from 'react';

import styles from './header.module.scss';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { toggleTheme, selectAppTheme } from 'features/AppTheme/appThemeSlice';

const Header = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const appTheme = useAppSelector(selectAppTheme);

    const onToggleThemeClick = (): void => {
        dispatch(toggleTheme());
    };

    return (
        <header className={styles.header}>
            <button onClick={onToggleThemeClick} type="button">
                Change to {appTheme === 'dark' ? 'light' : 'dark'}
            </button>
        </header>
    );
};

export default Header;
