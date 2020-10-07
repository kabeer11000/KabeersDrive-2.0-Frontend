import React from 'react';
import ReactDOM from 'react-dom';
import UploadComponent from './UploadComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UploadComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
