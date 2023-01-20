import { UserLoginRequest } from "../types/ApiRequest";

const loginApi = async (userDetails: UserLoginRequest) => {
    let res = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const registerApi = (userDetails: UserLoginRequest) => {
    fetch("/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const AuthService = { loginApi, registerApi }

export default AuthService