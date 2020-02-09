import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';

describe('<Profile/>', () => {
    it('matches snapshot', () => {
        const wrapper = mount(<Profile username="mun" name="문건우"/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders username and name', () => {
        const wrapper = mount(<Profile username="mun" name="문건우"/>);
        expect(wrapper.props().username).toBe('mun');
        expect(wrapper.props().name).toBe('문건우');

        const boldElement = wrapper.find('b');
        expect(boldElement.contains('mun')).toBe(true);
        const spanElement = wrapper.find('span');
        expect(spanElement.text()).toBe('(문건우)');
    });
});