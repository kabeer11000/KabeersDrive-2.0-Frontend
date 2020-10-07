import store from "../store/store";

export const SET_UPLOADING_FILES = "SET_UPLOADING_FILES";

export function setUploadingFiles(files) {
    console.log(files);
    return {
        type: SET_UPLOADING_FILES,
        filesUploading: [...store.getState().filesUploading, ...files],
    };
}
