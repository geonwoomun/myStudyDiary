import React from 'react';
import DelayedToggle from './DelayedToggle';
import {
    render,
    fireEvent,
    wait,
    waitForElement,
    waitForDomChange,
    waitForElementToBeRemoved
} from '@testing-library/react';

describe('<DelayedToggle', () => {
    it('reveals text when toggle is ON', async () => {
        const {getByText} = render(<DelayedToggle/>);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        await wait(() => getByText('야호!!'), {timeout : 3000});
    });

    it('toggles test ON/OFF', async () => {
        const {getByText} = render(<DelayedToggle/>);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        const text = await waitForElement(() => getByText('ON'));
        expect(text).toHaveTextContent('ON');
    });

    it('changes something when button is clicked', async () => {
        const { getByText, container } = render(<DelayedToggle/>);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        const mutations = await waitForDomChange({container});
        console.log(mutations);
    });

    it('removes text when toggle is OFF', async () => {
        const { getByText, container } = render(<DelayedToggle/>);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        await waitForDomChange({container}); // ON이 된다.
        getByText('야호!!'); // 야호!!가 있는지 확인
        fireEvent.click(toggleButton); // OFF가 된다
        await waitForElementToBeRemoved(() => getByText('야호!!')); //야호 사라지는지 확인
    })
});
