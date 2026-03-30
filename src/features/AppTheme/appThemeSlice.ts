import { createSlice } from '@reduxjs/toolkit';

export type AppTheme = 'dark' | 'light';

export type AppThemeState = {
    theme: AppTheme;
};

const initialState: AppThemeState = {
    theme: 'dark',
};

export const appThemeSlice = createSlice({
    name: 'appTheme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
    },
    selectors: {
        selectAppTheme: (appTheme) => appTheme.theme,
    },
});

export const { toggleTheme } = appThemeSlice.actions;

export const { selectAppTheme } = appThemeSlice.selectors;
