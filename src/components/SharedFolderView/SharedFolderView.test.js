import React from 'react';
import ReactDOM from 'react-dom';
import SharedFolderView from './SharedFolderView';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SharedFolderView/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
