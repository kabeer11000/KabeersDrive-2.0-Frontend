import {storageIndex} from "./StorageIndex";

export default () => {
    window.user = JSON.parse(atob(localStorage.getItem(storageIndex.userData)));

}
