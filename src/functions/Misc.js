import {endPoints} from "../api/EndPoints";
import React from "react";

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
/**
 *
 * @param arr1 The initial array
 * @param arr2 The array to remove
 * @param prop the key of the object to match on
 */
/*
export const differenceByPropVal = (arr1, arr2, prop) => arr1.filter((a) => !arr2.find((b) => b[prop] === a[prop]));
Array.prototype.removeContained = async function(array) {
    let i = this.length, results = [];
    while (i--) if (array.indexOf(this[i]) !== -1) results.push(this.splice(i, 1));
    return results;
};
export const removeFilterObjectsFromArray = (main, filtrate) => main.filter(x => !filtrate.filter(y => y.id === x.id).length);



//props.folder.files.filter(x => !currentlySelecting.files.filter(y => y.id === x.id).length)
//props.folder.files.filter(file => !currentlySelecting.files.find(f => f.id === file.id))
//props.folder.files.filter(file => currentlySelecting.files.findIndex(f => f.id === file.id))
props.handleBulkFileDelete(props.folder.files.filter(file => currentlySelecting.files.findIndex(f => f.id === file.id)));
setCurrentlySelecting({
    dialog: false,
    files: []
});
})
const filterObjectArray = (arr, filterArr) => arr.filter(el => filterArr.some(f => f.id !== el.id));
*/
export const makeBody = (obj) => Object.keys(obj).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
}, []).join('&');
export const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
