import React, {lazy, Suspense} from 'react';

const LazyHomeComponent = lazy(() => import('./HomeComponent'));

const HomeComponent = props => (
    <Suspense fallback={null}>
        <LazyHomeComponent {...props} />
    </Suspense>
);

export default HomeComponent;
