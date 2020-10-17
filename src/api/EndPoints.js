//export const hostName = `${window.location.protocol}//${window.location.host}`;
export const hostName = `${window.location.protocol}//${window.location.hostname}:9000`;
export const Proxy = `https://kabeersmusic.herokuapp.com/proxy/`;

export const endPoints = {
    getFolderById: id => `${hostName}/api/get/folder/${id ? id : window.user.user_id}`,
    getSharedFolderById: id => `${hostName}/api/get/shared/folder/${id}`,
    getFolderByFake: id => `https://raw.githubusercontent.com/kabeer11000/sample-response/master/Drive/folder.json`,
    changeFileSharing: (id) => `${hostName}/api/sharing/file/${id}`,
    changeFileSharingFake: (id, method) => `https://cdn.jsdelivr.net/gh/kabeer11000/sample-response@master/Drive/folder.json`,
    noPreviewAvailable: (id) => `http://drive.hosted-kabeersnetwork.unaux.com/server/modal/no-preview.php?d=${id}`,
    textFileViewer: (id) => `http://drive.hosted-kabeersnetwork.unaux.com/uViewFile.php?id=${id}`,
    documentViewer: (path) => `https://docs.google.com/gview?url=${path}&embedded=true`,
    fileDownloadById: (id) => `http://drive.hosted-kabeersnetwork.unaux.com/server/downloaders/download-file.php?id=${id}`,
    searchByQuery: (q) => `http://drive.hosted-kabeersnetwork.unaux.com/server/api/search.php?q=${q}`,
    userGetAllContentsMyDrive: `http://drive.hosted-kabeersnetwork.unaux.com/server/api/search.php?q=filter:all`,
    userGetAllContentsFolder: (id) => `http://drive.hosted-kabeersnetwork.unaux.com/server/api/search.php?q=filter:all&folder=${id}`,
    userSearchContentsMyDrive: `http://drive.hosted-kabeersnetwork.unaux.com/server/api/search.php?q=filter:all`,

    loginByUuid: `http://drive.hosted-kabeersnetwork.unaux.com/server/api/login.php`,
    internalLoginComponentRoute: `/login`,
    fileUpload: (folderId = null) => `${hostName}/api/upload/${folderId}`,
    authRedirect: `${hostName}/auth/redirect`,
    refreshToken: `${hostName}/auth/store/tokens/refresh`,
    getRecentFiles: (n = null) => `${hostName}/api/get/recent/file/${n ? n : ""}`,
    getFileDetailsById: (id) => `${hostName}/api/get/file/${id}`,
    createNewFolder: () => `${hostName}/api/create/new/folder`,

    getUserData: `${hostName}/auth/user/data`,


    filePath: `http://kabeer11000.mzzhost.com/`,
//    filePathReadFile: (path) => `http://kabeer11000.mzzhost.com/index.php?i=${encodeURIComponent(path)}`
    filePathReadFile: (path) => `https://vector-kabeersnetwork.000webhostapp.com/view-text.php?i=${path}`,
    filePathRaw: (path) => `https://vector-kabeersnetwork.000webhostapp.com/drive-hosted/${path}`,


    bulkDeleteFiles: `${hostName}/api/delete/bulk/file`,
    deleteOneFile: (id) => `${hostName}/api/delete/file/${id}`,
};
