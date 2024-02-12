import { createSlice } from '@reduxjs/toolkit';

export type AppThemeState = {
    theme: string;
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
