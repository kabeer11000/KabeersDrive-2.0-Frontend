const timeAgo = (comparisonDate) => {
    const timeparts = [
        {name: 'millenni', div: 31556736000, p: 'a', s: 'um'},
        {name: 'centur', div: 3155673600, p: 'ies', s: 'y'},
        {name: 'decade', div: 315567360},
        {name: 'year', div: 31556736},
        {name: 'month', div: 2629728},
        {name: 'day', div: 86400},
        {name: 'hour', div: 3600},
        {name: 'minute', div: 60},
        {name: 'second', div: 1}
    ];
    let i = 0,
        parts = [],
        interval = Math.floor((new Date().getTime() - comparisonDate) / 1000);
    for (; interval > 0; i += 1) {
        const value = Math.floor(interval / timeparts[i].div);
        interval = interval - (value * timeparts[i].div);
        if (value) parts.push(value + ' ' + timeparts[i].name + (value !== 1 ? timeparts[i].p || 's' : timeparts[i].s || ''));
    }
    if (parts.length === 0) return 'now';
    return parts.join(', ') + ' ago';
};
export default timeAgo;
