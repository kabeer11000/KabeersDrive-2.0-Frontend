import React, {lazy, Suspense} from 'react';

const LazyFileCardComponent = lazy(() => import('./FileCardComponent'));

const FileCardComponent = props => (
    <Suspense fallback={null}>
        <LazyFileCardComponent {...props} />
    </Suspense>
);

export default FileCardComponent;
