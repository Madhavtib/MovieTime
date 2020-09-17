

export default function logout()
{
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("username");
}