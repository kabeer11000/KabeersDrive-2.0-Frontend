import React, {lazy, Suspense} from 'react';

const LazySharedView = lazy(() => import('./SharedView'));

const SharedView = props => (
    <Suspense fallback={null}>
        <LazySharedView {...props} />
    </Suspense>
);

export default SharedView;
