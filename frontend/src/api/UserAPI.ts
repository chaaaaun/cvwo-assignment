import { UserLoginRequest } from "../types/ApiRequest";
import { UserResponse } from "../types/ApiResponse";

const loginUser = async (userDetails: UserLoginRequest) => {
    let res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const registerUser = async (userDetails: UserLoginRequest) => {
    let res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const getUser = async () => {
    let res = await fetch("/api/auth/user")
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as UserResponse;
}

const updateUserPassword = async () => {

}

const UserAPI = { loginUser, registerUser, getUser, updateUserPassword };

export default UserAPI;