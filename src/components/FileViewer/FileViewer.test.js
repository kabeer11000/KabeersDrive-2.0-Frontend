import React from 'react';
import ReactDOM from 'react-dom';
import FileViewer from './FileViewer';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileViewer/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
