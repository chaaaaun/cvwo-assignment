import { Button, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import theme from "../../theme";
import { LoginState, ThreadState } from "../../types/FormStates";
import { ThreadDetails, UserLoginDetails } from "../../types/DataModels";

const initialState: ThreadState = {
    title: "",
    content: "",
    tags: "",
};

type ACTIONTYPE = { type: "field"; fieldName: string; payload: string }

function reducer(state: ThreadState, action: ACTIONTYPE) {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        default:
            throw new Error();
    }
}

export default function ThreadForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    let location = useLocation();

    const onTitleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        if (state.title.length >= 299) {
            return;
        }
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

        const thread: ThreadDetails = {
            title: state.title,
            content: state.content,
            tags: state.tags
        }
        
        ApiService.createThread(thread);
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
                error={state.title === ""}
                helperText={state.title === "" ? "Required!" : " "}
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
            <Button onClick={handleSubmit}
                variant="contained" 
                sx={{ marginY: theme.spacing(1) }}>
                Post
            </Button>
        </form>
    );
}