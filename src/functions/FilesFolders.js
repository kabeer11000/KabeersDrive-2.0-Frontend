import {endPoints} from "../api/EndPoints";
import Fuse from "fuse.js";
import {fuseOptions} from "./Misc";

export const getFolderById = async (id, abortController = new AbortController) => await fetch(endPoints.getFolderByFake(id), {
    signal: abortController.signal
}).then(res => res.json());
export const changeFileLinkSharing = async (id, method) => await fetch(endPoints.changeFileSharingFake(id, method));
export const searchUserFiles = async (q, folderId = null) => folderId ? fetch(endPoints.userGetAllContentsFolder(folderId))
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
//searchUserFiles("pdf").then((v) => alert(JSON.stringify(v)));
