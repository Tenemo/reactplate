import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAppTheme } from 'store/app/appSelectors';
import { toggleTheme } from 'store/app/appActions';

import styles from './header.scss';

export const Header = (): ReactElement => {
    const dispatch = useDispatch();
    const appTheme = useSelector(getAppTheme);

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
