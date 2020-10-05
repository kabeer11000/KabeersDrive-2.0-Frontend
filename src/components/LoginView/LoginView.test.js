import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from './LoginView';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginView/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
