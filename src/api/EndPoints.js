//export const hostName = `${window.location.protocol}//${window.location.host}`;
export const hostName = `${window.location.protocol}//${window.location.hostname}:9000`;
export const Proxy = `https://kabeersmusic.herokuapp.com/proxy/`;

export const endPoints = {
    getFolderById: id => `http://drive.hosted-kabeersnetwork.unaux.com/server/api/folder.php?id=${id}`,
    getFolderByFake: id => `https://raw.githubusercontent.com/kabeer11000/sample-response/master/Drive/folder.json`,
    changeFileSharing: (id, method) => `http://drive.hosted-kabeersnetwork.unaux.com/server/files-server.php?share=${id}&ShareN=${+method}`,
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
};
