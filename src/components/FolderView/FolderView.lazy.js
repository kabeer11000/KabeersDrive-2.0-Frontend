import React, {lazy, Suspense} from 'react';

const LazyFolderView = lazy(() => import('./FolderView'));

const FolderView = props => (
    <Suspense fallback={null}>
        <LazyFolderView {...props} />
    </Suspense>
);

export default FolderView;
