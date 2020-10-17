import {endPoints} from "../api/EndPoints";
import Fuse from "fuse.js";
import {fuseOptions, makeBody} from "./Misc";
import {storageIndex} from "./StorageIndex";
import {initAuth} from "./Auth";
import {createWorker} from "./Worker/createWorker";

export const getFolderById = async (id, token, abortController = new AbortController) => await fetch(endPoints.getFolderById(id), {
    headers: new Headers({
        "Authorization": `Bearer ${token}`
    }),
    signal: abortController.signal
}).then(res => res.json());
export const uploadFormDataAsFile = async (token, formData, id = null, abortController = new AbortController()) => await fetch(endPoints.fileUpload(id || JSON.parse(atob(localStorage.getItem(storageIndex.userData))).user_id), {
    method: "POST",
    headers: new Headers({
        "Authorization": `Bearer ${token}`
    }),
    signal: abortController.signal,
    body: formData
}).then(value => value.json());
const fetchWorker = createWorker(e => {
    const s = JSON.parse(e.data);
    fetch(s.url, s).then(e => e.json()).then(e => postMessage(JSON.stringify(e)));
});

export const createNewFolder = async (token, name, parentFolder = undefined, abortController = new AbortController()) => await fetch(endPoints.createNewFolder(), {
    method: "POST",
    headers: new Headers({
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }),
    signal: abortController.signal,
    body: makeBody({
        name: name || "Untitled Folder",
        id: parentFolder
    })
}).then(value => value.json());

export const changeFileLinkSharing = async (id, method, abortController = new AbortController()) => initAuth().then(token => fetch(endPoints.changeFileSharing(id), {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": `Bearer ${token}`,
    }),
    body: makeBody({
        sharing: method
    }),
    signal: abortController.signal
}));
export const deleteManyFiles = async (ids, abortController = new AbortController()) => initAuth().then(token => fetch(endPoints.bulkDeleteFiles, {
    method: "POST",
    headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": `Bearer ${token}`,
    }),
    body: makeBody({
        ids: ids.join("|")
    }),
    signal: abortController.signal
}));
export const searchUserFiles = async (q, folderId = null) => folderId ? fetch(endPoints.userGetAllContentsFolder(folderId), {})
    .then(res => res.json())
    .then((res) => ({
        files: new Fuse(res.items.files, fuseOptions.files).search(q),
        folders: new Fuse(res.items.folders, fuseOptions.folders).search(q)
    })) : fetch("http://cdn.jsdelivr.net/gh/kabeer11000/sample-response/Drive/search-filter-all.json")
    .then(res => res.json())
    .then((res) => ({
        files: new Fuse(res.items.files, fuseOptions.files).search(q),
        folders: new Fuse(res.items.folders, fuseOptions.folders).search(q)
    }));
export const getRecentFiles = async (token, abortController, n = 10) => await fetch(endPoints.getRecentFiles(10), {
    headers: new Headers({
        "Authorization": `Bearer ${token}`
    }),
    signal: abortController.signal
}).then(value => value.json());
export const getFileInfoById = async (token, abortController, id) => await fetch(endPoints.getFileDetailsById(id), {
    headers: new Headers({
        "Authorization": `Bearer ${token}`
    }),
    signal: abortController.signal
}).then(value => value.json());
export const getFolderInfo = async (token, id, abortController = new AbortController()) => await fetch(endPoints.getFolderById(id), {
    headers: new Headers({
        "Authorization": `Bearer ${token}`
    }),
    signal: abortController.signal
}).then(value => value.json());
export const fileDeleteOne = async () => {
};
// export const fileDeleteOne = async (id, abortController = new AbortController()) => await initAuth().then(async token => await fetch(endPoints.deleteOneFile(id), {
//     method: "POST",
//     headers: new Headers({
//         "Authorization": `Bearer ${token}`
//     }),
//     signal: abortController.signal
// }).then(value => value.json()));
//searchUserFiles("pdf").then((v) => alert(JSON.stringify(v)));
