import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './HomeComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomeComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
