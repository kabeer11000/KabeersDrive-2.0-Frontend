import React, {lazy, Suspense} from 'react';

const LazyLoginView = lazy(() => import('./LoginView'));

const LoginView = props => (
    <Suspense fallback={null}>
        <LazyLoginView {...props} />
    </Suspense>
);

export default LoginView;
