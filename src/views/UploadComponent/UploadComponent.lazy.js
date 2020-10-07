import React, {lazy, Suspense} from 'react';

const LazyUploadComponent = lazy(() => import('./UploadComponent'));

const UploadComponent = props => (
    <Suspense fallback={null}>
        <LazyUploadComponent {...props} />
    </Suspense>
);

export default UploadComponent;
