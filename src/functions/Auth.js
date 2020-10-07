import {endPoints} from "../api/EndPoints";

const cookies = {
    getCookie(e) {
        for (let t = e + "=", o = decodeURIComponent(document.cookie).split(";"), n = 0; n < o.length; n++) {
            for (var r = o[n]; " " === r.charAt(0);) r = r.substring(1);
            if (0 === r.indexOf(t)) return r.substring(t.length, r.length);
        }
        return "";
    }, setCookie(e, t, o) {
        const n = new Date;
        n.setTime(n.getTime() + 24 * o * 60 * 60 * 1e3);
        const r = "expires=" + n.toUTCString();
        document.cookie = e + "=" + t + ";" + r + ";path=/";
    }
};
export const initAuth = async () => {
    let token = cookies.getCookie("token");
    if (!token) {
        window.location.href = endPoints.authRedirect;
        return new Error("Failed to Auth, Redirecting");
    }

    token = JSON.parse(token);
    if (Math.floor(((Date.now() - token.exp) / 1000) / 60) > 120) { // Two Hours
        return await fetch(endPoints.refreshToken, {}, 5000).then(res => res.ok ? res.json() : null);
    } // Expired
    return token.token; // Return Token
};

(async () => {
    /*
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

     */
})();
