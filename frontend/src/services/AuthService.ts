import { UserLoginDetails } from "../types/User";

const loginApi = (userDetails: UserLoginDetails) => {
    fetch("/login", {
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
            throw error;
        });
}

const registerApi = (userDetails: UserLoginDetails) => {
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