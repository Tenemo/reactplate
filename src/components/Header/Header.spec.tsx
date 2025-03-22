import { screen, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { makeStore } from 'app/store';
import Header from 'components/Header/Header';
import { renderWithProviders } from 'utils/test-utils';

describe('Header', () => {
    it('clicking theme toggle button should change the theme', async () => {
        const store = makeStore({
            appTheme: { theme: 'dark' },
        });

        const { user } = renderWithProviders(<Header />, { store });

        const button = screen.getByRole('button');

        await act(async () => {
            await user.click(button);
        });

        expect(store.getState().appTheme.theme).toBe('light');
    });
});
