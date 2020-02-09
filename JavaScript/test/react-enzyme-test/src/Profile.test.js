import React from 'react';
import {render} from '@testing-library/react';
import Profile from './Profile';

describe('<Profile/>', () => {
    it('matches snapshot', () => {
        const utils = render(<Profile username="mun" name="문건우"/>);
        expect(utils.container).toMatchSnapshot();
    });
    it('renders username and name', () => {
        const utils = render(<Profile username="mun" name="문건우"/>);
        utils.getByText('mun');
        utils.getByText('(문건우)');
        utils.getByText(/문/);
    });
});