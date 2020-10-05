import React from 'react';
import ReactDOM from 'react-dom';
import SharedView from './SharedView';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SharedView/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
