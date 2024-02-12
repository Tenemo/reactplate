import { screen } from '@testing-library/react';
import React from 'react';

import { makeStore } from 'app/store';
import Header from 'features/Header/Header';
import { renderWithProviders } from 'utils/test-utils';

describe('Header', () => {
    it('clicking theme toggle button should change the theme', () => {
        const store = makeStore({
            appTheme: { theme: 'dark' },
        });

        renderWithProviders(<Header />, { store });

        const button = screen.getByRole('button');
        button.click();

        expect(store.getState().appTheme.theme).toBe('light');
    });
});
