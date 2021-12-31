import React from 'react';
import { shallow, mount } from 'enzyme';
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
        selector(mockStore.getState()),
    ),
    useDispatch: jest.fn(() => mockStore.dispatch),
}));

jest.mock('store/app/appActions', () => {
    return {
        toggleTheme: jest.fn(() => ({
            type: 'APP_TOGGLE_THEME',
        })),
    };
});

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

    it('should match the snapshot', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper).toMatchSnapshot();
    });
    it('clicking theme toggle button should change the theme', () => {
        const wrapper = mount(<Header />);
        const ToggleThemeButton = wrapper.find('button');
        ToggleThemeButton.simulate('click', {
            preventDefault: () => undefined,
        });
        expect(mockStore.getActions()).toEqual([{ type: APP_TOGGLE_THEME }]);
        expect(appActions.toggleTheme).toHaveBeenCalledTimes(1);
    });
});
