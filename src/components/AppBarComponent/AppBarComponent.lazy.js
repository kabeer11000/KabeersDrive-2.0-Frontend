import React, {lazy, Suspense} from 'react';

const LazyAppBarComponent = lazy(() => import('./AppBarComponent'));

const AppBarComponent = props => (
    <Suspense fallback={null}>
        <LazyAppBarComponent {...props} />
    </Suspense>
);

export default AppBarComponent;
