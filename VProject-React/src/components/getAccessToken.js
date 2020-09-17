
export default function getAccessToken() {
    return JSON.parse(localStorage.getItem("accesstoken"));
}