import {endPoints} from "../api/EndPoints";

export const getQueryStringParams = query => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
};
export const downloadFile = async e => {
    const o = document.createElement("a");
    return o.setAttribute("download", e.name), o.href = endPoints.fileDownloadById(e.id), document.body.appendChild(o), o.click(), o.remove();
};
export const searchFiles = async q => await fetch(endPoints.searchByQuery(q)).then(res => res.json());
export const fuseOptions = {
    files: {
        includeScore: false,
        useExtendedSearch: false,
        shouldSort: false,
        threshold: 0.5,
        findAllMatches: false,
        minMatchCharLength: 0,
        keys: [
            "name",
            "mimeType",
            "shared",
            "dateCreated"
        ]
    },
    folders: {
        includeScore: false,
        useExtendedSearch: false,
        shouldSort: false,
        threshold: 0.5,
        findAllMatches: false,
        minMatchCharLength: 0,
        keys: [
            "name",
            "shared",
        ]
    }
};
export const makeBody = (obj) => Object.keys(obj).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
}, []).join('&');
export const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
