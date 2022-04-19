import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import createMockStore, { MockStore } from 'redux-mock-store';

import { APP_TOGGLE_THEME } from 'store/app/appTypes';
import { initialAppState } from 'store/app/appReducer';
import { RootState } from 'store/types';

import { Header } from './Header';

let mockStore: MockStore;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn((selector: (state: RootState) => void) =>
        selector(mockStore.getState() as RootState),
    ),
    useDispatch: jest.fn(() => mockStore.dispatch),
}));

jest.mock('store/app/appActions', () => ({
    toggleTheme: jest.fn(() => ({
        type: 'APP_TOGGLE_THEME',
    })),
}));

describe('Header', () => {
    const emptyMockStore = createMockStore([thunk]);

    let reactRedux: typeof import('react-redux');
    type MockUseSelector = typeof reactRedux.useSelector & {
        mockClear: () => void;
    };
    type MockUseDispatch = typeof reactRedux.useDispatch & {
        mockClear: () => void;
    };

    let appActions: typeof import('store/app/appActions');
    type MockAppActions = {
        toggleTheme: {
            mockClear: () => void;
        };
    };

    beforeAll(async () => {
        reactRedux = await import('react-redux');
        appActions = await import('store/app/appActions');
    });
    beforeEach(() => {
        mockStore = emptyMockStore({ app: initialAppState });
    });
    afterEach(() => {
        (reactRedux.useSelector as MockUseSelector).mockClear();
        (reactRedux.useDispatch as MockUseDispatch).mockClear();
        (appActions as unknown as MockAppActions).toggleTheme.mockClear();
    });

    it('clicking theme toggle button should change the theme', async () => {
        render(<Header />);
        await waitFor(() => screen.getByRole('button'));
        fireEvent.click(screen.getByRole('button'));
        expect(mockStore.getActions()).toEqual([{ type: APP_TOGGLE_THEME }]);
        expect(appActions.toggleTheme).toHaveBeenCalledTimes(1);
    });
});
