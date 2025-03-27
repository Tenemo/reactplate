import { screen, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect, beforeEach } from 'vitest';

import { makeStore } from 'app/store';
import Header from 'components/Header/Header';
import { renderWithProviders } from 'utils/test-utils';

describe('Header', () => {
    let store: ReturnType<typeof makeStore>;

    beforeEach(() => {
        store = makeStore({
            appTheme: { theme: 'dark' },
        });
    });

    it('should display the app title', () => {
        renderWithProviders(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
            { store },
        );
        const title = screen.getByText('reactplate');
        expect(title).not.toBeNull();
    });

    it('clicking theme toggle button should change the theme', async () => {
        const { user } = renderWithProviders(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
            { store },
        );

        const button = screen.getByRole('button');

        await act(async () => {
            await user.click(button);
        });

        expect(store.getState().appTheme.theme).toBe('light');
    });
});
