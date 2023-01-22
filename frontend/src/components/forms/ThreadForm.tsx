import { Button, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommentAPI from "../../api/CommentAPI";
import theme from "../../theme";
import { LoginState, ThreadState } from "../../types/FormStates";
import { ThreadRequest, UserLoginRequest } from "../../types/ApiRequest";
import ThreadAPI from "../../api/ThreadAPI";
import { Thread } from "../../types/DataModels";

const initialState: ThreadState = {
    title: "",
    content: "",
    tags: "",
    isFetching: false,
    error: "",
};

type ACTIONTYPE =
    | { type: "field"; fieldName: string; payload: string }
    | { type: "toggle"; toggleName: string };

function reducer(state: ThreadState, action: ACTIONTYPE) {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        case "toggle":
            return {
                ...state,
                [action.toggleName]: !state[action.toggleName as keyof ThreadState]
            };
        default:
            throw new Error();
    }
}

export default function ThreadForm(props: { thread?: Thread }) {
    const navigate = useNavigate();

    let initialState: ThreadState = {
        title: "",
        content: "",
        tags: "",
        isFetching: false,
        error: ""
    };
    if (props.thread) {
        initialState.title = props.thread.Title
        initialState.content = props.thread.Content
        initialState.tags = props.thread.Tags
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const onTitleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'title', payload: e.currentTarget.value })
    }

    const onContentChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'content', payload: e.currentTarget.value })
    }

    const onTagsChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'tags', payload: e.currentTarget.value })
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        dispatch({ type: 'toggle', toggleName: 'isFetching' })

        const thread: ThreadRequest = {
            title: state.title,
            content: state.content,
            tags: state.tags
        }

        ThreadAPI.createThread(thread)
            .then(() => navigate("/"))
            .catch(err => dispatch({ type: 'field', fieldName: 'error', payload: err }))
            .finally(() => dispatch({ type: 'toggle', toggleName: 'isFetching' }));
    }

    return (
        <form>
            <TextField fullWidth onChange={onTitleChange}
                value={state.title}
                id="title-field"
                label="Title"
                variant="outlined"
                margin="dense"
                required
                inputProps={{
                    maxLength: 300,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{state.title.length + " / 300"}</InputAdornment>,
                }}
            />
            <TextField fullWidth onChange={onContentChange}
                value={state.content}
                id="content-field"
                label="Text (optional)"
                multiline
                rows={4}
                margin="dense"
            />
            <TextField fullWidth onChange={onTagsChange}
                value={state.tags}
                id="tags-field"
                label="Tags (optional)"
                margin="dense"
                helperText="Tags can only be alphanumeric characters, delineated by semicolons"
            />
            {
                state.title.length === 0
                    ? <Button disabled variant="contained" sx={{ marginY: theme.spacing(1) }}>
                        Post
                    </Button>
                    : <Button onClick={handleSubmit}
                        variant="contained"
                        sx={{ marginY: theme.spacing(1) }}>
                        Post
                    </Button>
            }
            
        </form>
    );
}