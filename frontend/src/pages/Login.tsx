import React, { ChangeEventHandler, FormEventHandler, MouseEventHandler, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserLoginDetails } from "../types/User";
import { useAuth } from "../services/AuthContext";
import AuthService from "../services/AuthService";
import { LoginState } from "../types/LoginState";

const initialState = {
    username: "",
    password: "",
    isLogin: true,
    isRemember: false,
};

type ACTIONTYPE =
    | { type: "field"; fieldName: string; payload: string }
    | { type: "toggle"; toggleName: string };

function reducer(state: LoginState, action: ACTIONTYPE) {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        case "toggle":
            return {
                ...state,
                [action.toggleName]: !state[action.toggleName as keyof LoginState]
            };
        default:
            throw new Error();
    }
}

function Login() {
    const [state, dispatch] = useReducer(reducer, initialState);

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    let from = location.state?.from?.pathname || "/";

    const onUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'username', payload: e.currentTarget.value })
    }

    const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'password', payload: e.currentTarget.value })
    }

    const onLoginToggle: MouseEventHandler<HTMLInputElement> = (e) => {
        dispatch({ type: 'toggle', toggleName: 'isLogin' })
    }

    const onRememberToggle: MouseEventHandler<HTMLInputElement> = (e) => {
        dispatch({ type: 'toggle', toggleName: 'isRemember' })
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const user: UserLoginDetails = {
            username: state.username,
            password: state.password,
            isRemember: state.isRemember
        }
        if (state.isLogin) {
            auth.login(
                user,
                // Navigates user back to where they were redirected
                () => { navigate(from, { replace: true }) }
            )
        } else {
            AuthService.registerApi(user)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="button" name="logreg" onClick={onLoginToggle} value={`${state.isLogin ? "Login" : "Register"}`} /><br />
            <label>
                username:
                <input type="text" name="username" id="username" value={state.username} onChange={onUsernameChange} />
            </label>
            <br></br>
            <label>
                password:
                <input type="password" name="password" id="password" value={state.password} onChange={onPasswordChange} />
            </label><br />
            {state.isLogin &&
                <label>Remember me
                    <input type="button" name="rememberme" onClick={onRememberToggle} value={`${state.isRemember}`} />
                </label>
            }
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Login;