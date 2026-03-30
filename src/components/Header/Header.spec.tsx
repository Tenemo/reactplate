import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';

import { Header } from './Header';

import * as appActions from 'store/app/appActions';
import { initialAppState } from 'store/app/appReducer';
import { APP_TOGGLE_THEME } from 'store/app/appTypes';
import { RootState } from 'store/types';

let mockDispatch = jest.fn();
let mockState: RootState;

type MockUseSelector = jest.MockedFunction<typeof reactRedux.useSelector>;
type MockUseDispatch = jest.MockedFunction<typeof reactRedux.useDispatch>;

jest.mock('react-redux', (): typeof import('react-redux') => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn() as unknown as typeof reactRedux.useSelector,
    useDispatch: jest.fn() as unknown as typeof reactRedux.useDispatch,
}));

jest.mock('store/app/appActions', () => ({
    toggleTheme: jest.fn(() => ({
        type: 'APP_TOGGLE_THEME',
    })),
}));

describe('Header', () => {
    const mockUseSelector = reactRedux.useSelector as MockUseSelector;
    const mockUseDispatch = reactRedux.useDispatch as MockUseDispatch;
    const mockToggleTheme = appActions.toggleTheme as jest.MockedFunction<
        typeof appActions.toggleTheme
    >;

    beforeEach(() => {
        mockDispatch = jest.fn();
        mockState = { app: initialAppState } as RootState;
        mockUseSelector.mockImplementation(
            (selector: (state: RootState) => unknown) => selector(mockState),
        );
        mockUseDispatch.mockReturnValue(mockDispatch as never);
    });
    afterEach(() => {
        mockUseSelector.mockReset();
        mockUseDispatch.mockReset();
        mockToggleTheme.mockClear();
    });

    it('clicking theme toggle button should change the theme', async () => {
        render(<Header />);
        await waitFor(() => screen.getByRole('button'));
        fireEvent.click(screen.getByRole('button'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: APP_TOGGLE_THEME });
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
});
