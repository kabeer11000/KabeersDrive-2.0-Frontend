import React, {lazy, Suspense} from 'react';

const LazyDrawerComponent = lazy(() => import('./DrawerComponent'));

const DrawerComponent = props => (
    <Suspense fallback={null}>
        <LazyDrawerComponent {...props} />
    </Suspense>
);

export default DrawerComponent;
