import React, {lazy, Suspense} from 'react';

const LazySharedFolderView = lazy(() => import('./SharedFolderView'));

const SharedFolderView = props => (
    <Suspense fallback={null}>
        <LazySharedFolderView {...props} />
    </Suspense>
);

export default SharedFolderView;
