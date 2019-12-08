import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe(`App`, (): void => {
    it(`should match the snapshot`, (): void => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
