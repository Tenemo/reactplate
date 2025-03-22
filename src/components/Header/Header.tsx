import {
    GitHub as GitHubIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material';
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
            <div
                aria-label={`Switch to ${appTheme === 'dark' ? 'light' : 'dark'} theme`}
                className={styles.themeToggle}
                onClick={onToggleThemeClick}
                onKeyDown={({ key }) => {
                    if (key === 'Enter' || key === ' ') {
                        onToggleThemeClick();
                    }
                }}
                role="button"
                tabIndex={0}
            >
                {appTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </div>

            <a
                className={styles.gitHubLink}
                href="https://github.com/Tenemo/reactplate"
                rel="noopener noreferrer"
                target="_blank"
            >
                <GitHubIcon />
            </a>
        </header>
    );
};

export default Header;
