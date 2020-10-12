import React from 'react';
import ReactDOM from 'react-dom';
import FolderView from './FolderView';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FolderView/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
