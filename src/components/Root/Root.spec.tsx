import React from 'react';
import { shallow } from 'enzyme';

import { Root } from './Root';

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
    it('renders ConnectedRouter', () => {
        const wrapper = shallow(<Root />);
        const ConnectedRouter = wrapper.find(
            'Connect(ConnectedRouterWithContext)',
        );
        expect(ConnectedRouter.exists()).toEqual(true);
    });
    it('renders App', () => {
        const wrapper = shallow(<Root />);
        const App = wrapper.find('App');
        expect(App.exists()).toEqual(true);
    });
});
