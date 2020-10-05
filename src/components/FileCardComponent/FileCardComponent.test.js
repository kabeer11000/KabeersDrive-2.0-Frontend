import React from 'react';
import ReactDOM from 'react-dom';
import FileCardComponent from './FileCardComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileCardComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
