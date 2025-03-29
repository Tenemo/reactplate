import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import React from 'react';
import { Link } from 'react-router';

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
            <Link to="/">
                <h1>reactplate</h1>
            </Link>
            <div className={styles.headerButtons}>
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
                    aria-label="GitHub repository"
                    className={styles.gitHubLink}
                    href="https://github.com/Tenemo/reactplate"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <GitHubIcon />
                </a>
            </div>
        </header>
    );
};

export default Header;
