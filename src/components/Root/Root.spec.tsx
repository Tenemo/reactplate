import React from 'react';
import { shallow } from 'enzyme';
import { Dispatch, Action } from 'redux';

import { Root } from './Root';

// suppressing logging by replacing redux-logger with empty middleware
jest.mock('redux-logger', () => ({
    createLogger: jest.fn(
        () => () => (next: Dispatch<{ type: string }>) => (action: Action) =>
            next(action),
    ),
}));

describe('Root', () => {
    it('matches snapshot', () => {
        const wrapper = shallow(<Root />);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders Redux Provider', () => {
        const wrapper = shallow(<Root />);
        const Provider = wrapper.find('Provider');
        expect(Provider.exists()).toEqual(true);
    });
    it('renders HistoryRouter', () => {
        const wrapper = shallow(<Root />);
        const HistoryRouter = wrapper.find('HistoryRouter');
        expect(HistoryRouter.exists()).toEqual(true);
    });
    it('renders App', () => {
        const wrapper = shallow(<Root />);
        const App = wrapper.find('Connect(App)');
        expect(App.exists()).toEqual(true);
    });
    it('passes', () => {
        expect(true).toEqual(true);
    });
});
