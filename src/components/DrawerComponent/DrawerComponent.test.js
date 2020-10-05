import React from 'react';
import ReactDOM from 'react-dom';
import DrawerComponent from './DrawerComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DrawerComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
