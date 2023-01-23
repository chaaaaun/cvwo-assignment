import { Check } from "@mui/icons-material";
import { Alert, Button, Link, TextField, Typography } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useReducer } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import UserAPI from "../../api/UserAPI";
import { useAuth } from "../../services/AuthContext";
import theme from "../../theme";
import { UserLoginRequest } from "../../types/ApiRequest";
import { LoginState } from "../../types/FormStates";

const initialState: LoginState = {
    username: "",
    password: "",
    isLogin: true,
    isFetching: false,
    error: "",
    successMsg: ""
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

export default function LoginForm() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const from = location.state?.from?.pathname || "/";

    if (auth.user) {
        redirect("/")
    }

    const onUsernameChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'username', payload: e.currentTarget.value })
    }

    const onPasswordChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'password', payload: e.currentTarget.value })
    }

    const onLoginToggle: MouseEventHandler<HTMLAnchorElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'error', payload: '' })
        dispatch({ type: 'field', fieldName: 'successMsg', payload: '' })
        dispatch({ type: 'field', fieldName: 'username', payload: '' })
        dispatch({ type: 'field', fieldName: 'password', payload: '' })
        dispatch({ type: 'toggle', toggleName: 'isLogin' })
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        if (state.username.length < 3 ) {
            dispatch({ type: 'field', fieldName: 'error', payload: 'Username must be at least 3 characters long' })
            return;
        } else if (state.password.length < 8) {
            dispatch({ type: 'field', fieldName: 'error', payload: 'Password must be at least 8 characters long' })
            return;
        }

        dispatch({ type: 'field', fieldName: 'error', payload: '' })
        dispatch({ type: 'toggle', toggleName: 'isFetching' })

        const user: UserLoginRequest = {
            id: state.username,
            password: state.password
        }
        if (state.isLogin) {
            auth.login(
                user,
                // Navigates user back to where they were redirected unless there's an error
                (err) => {
                    if (err) {
                        dispatch({ type: 'field', fieldName: 'password', payload: '' })
                        dispatch({ type: 'field', fieldName: 'error', payload: 'Invalid username or password' })
                    } else {
                        navigate(from, { replace: true })
                    }
                }
            )
            dispatch({ type: 'toggle', toggleName: 'isFetching' });
        } else {
            UserAPI.registerUser(user)
                .then(() => {
                    dispatch({ type: 'field', fieldName: 'successMsg', payload: 'Account created' })
                    dispatch({ type: 'field', fieldName: 'username', payload: '' })
                    dispatch({ type: 'field', fieldName: 'password', payload: '' })
                })
                .catch((err) => dispatch({ type: 'field', fieldName: 'error', payload: 'Username taken' }))
                .finally(() => dispatch({ type: 'toggle', toggleName: 'isFetching' }));
        }
    }

    return (
        <form>
            <Typography variant="h4" mb={1}>{state.isLogin ? "Log In" : "Register"}</Typography>
            {
                state.successMsg &&
                    <Alert icon={<Check fontSize="inherit" />}  severity="success">{state.successMsg}</Alert>
            }
            <TextField fullWidth onChange={onUsernameChange}
                value={state.username}
                id="username-field"
                label="Username"
                variant="outlined"
                margin="dense"
                error={state.error !== ""}
            />
            <TextField fullWidth onChange={onPasswordChange}
                value={state.password}
                id="password-field"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="dense"
                error={state.error !== ""}
            />
            <Typography variant="subtitle1" color="error">{`${state.error}`}</Typography>
            {
                state.isFetching
                    ? <Button fullWidth variant="contained" disabled>Please Wait</Button>
                    : <Button fullWidth onClick={handleSubmit}
                        variant="contained"
                        sx={{ marginY: theme.spacing(1) }}>
                        {state.isLogin ? "Login" : "Register"}
                    </Button>
            }
            {
                state.isLogin
                    ? <Typography variant="body1">New to Sakura? <Link onClick={onLoginToggle}>Register</Link></Typography>
                    : <Typography variant="body1">Already registered? <Link onClick={onLoginToggle}>Log In</Link></Typography>
            }
        </form>
    );
}