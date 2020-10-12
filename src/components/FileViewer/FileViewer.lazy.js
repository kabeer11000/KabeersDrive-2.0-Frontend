import React, {lazy, Suspense} from 'react';

const LazyFileViewer = lazy(() => import('./FileViewer'));

const FileViewer = props => (
    <Suspense fallback={null}>
        <LazyFileViewer {...props} />
    </Suspense>
);

export default FileViewer;
