import {endPoints} from "../api/EndPoints";
import {storageIndex} from "./StorageIndex";
import AfterAuthFunctions from "./AfterAuthFunctions";

const cookies = {
    getCookie(e) {
        for (let t = e + "=", o = decodeURIComponent(document.cookie).split(";"), n = 0; n < o.length; n++) {
            for (var r = o[n]; " " === r.charAt(0);) r = r.substring(1);
            if (0 === r.indexOf(t)) return r.substring(t.length, r.length);
        }
        return "";
    },
    setCookie(e, t, o) {
        const n = new Date;
        n.setTime(n.getTime() + 24 * o * 60 * 60 * 1e3);
        const r = "expires=" + n.toUTCString();
        document.cookie = e + "=" + t + ";" + r + ";path=/";
    }
};
export const initAuth = async () => {
    let userData = cookies.getCookie("9b8eec254fa16696b291f984546528d8");
    if (!userData) {
        window.location.href = endPoints.internalLoginComponentRoute;
        return new Error("Failed to Auth, Redirecting");
    }

    userData = JSON.parse(userData);
    await fetch(endPoints.loginByUuid, {
        headers: {
            "Authorization": "Basic " + btoa(userData.username + ":" + userData.password)
        },
    }).then(res => res.ok ? res.json() : null);
    return token.token; // Return Token
};

(async () => {
    if (!cookies.getCookie("user_data_token")) return window.location.href = endPoints.authRedirect;
    if (localStorage.getItem(storageIndex.userData) === null || undefined) return fetch(endPoints.getUserData, {
        headers: new Headers({
            "IdToken": JSON.parse(cookies.getCookie("user_data_token")).token
        })
    })
        .then(res => res.json())
        .then(userData => localStorage.setItem(storageIndex.userData, btoa(JSON.stringify(userData))))
        .catch(e => console.log(e));
    else await AfterAuthFunctions();
    //Every thing is fine joe
})();
