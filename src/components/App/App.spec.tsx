import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe(`App`, (): void => {
    const props = { appTheme: 'light' };
    it('renders all routes', () => {
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.find('Route')).toHaveLength(2);
    });
});
