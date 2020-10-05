import React from 'react';
import ReactDOM from 'react-dom';
import AppBarComponent from './AppBarComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppBarComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
