import React from 'react';
import ReactDOM from 'react-dom';
import RecentFileCard from './RecentFileCard';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecentFileCard/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
