import React, {lazy, Suspense} from 'react';

const LazyFileCardComponent = lazy(() => import('./FolderCardComponent'));

const FolderCardComponent = props => (
    <Suspense fallback={null}>
        <LazyFileCardComponent {...props} />
    </Suspense>
);

export default FolderCardComponent;
