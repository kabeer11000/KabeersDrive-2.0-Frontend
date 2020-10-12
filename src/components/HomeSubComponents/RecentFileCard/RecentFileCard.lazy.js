import React, {lazy, Suspense} from 'react';

const LazyRecentFileCard = lazy(() => import('./RecentFileCard'));

const RecentFileCard = props => (
    <Suspense fallback={null}>
        <LazyRecentFileCard {...props} />
    </Suspense>
);

export default RecentFileCard;
