import { Button, InputAdornment, TextField } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import ThreadAPI from "../../api/ThreadAPI";
import theme from "../../theme";
import { ThreadRequest } from "../../types/ApiRequest";
import { Thread } from "../../types/DataModels";
import { reducer, ThreadState } from "../../types/FormStates";

export default function ThreadForm(props: { thread?: Thread }) {
    const navigate = useNavigate();

    const initialState: ThreadState = {
        title: "",
        content: "",
        tags: "",
        isFetching: false,
        error: ""
    }
    // Update state details if its an edit
    if (props.thread) {
        initialState.title = props.thread.Title
        initialState.content = props.thread.Content
        initialState.tags = props.thread.Tags
    }

    const [state, dispatch] = useReducer(reducer<ThreadState>, initialState);

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

        // Validate tag input to only alphanumeric and semicolons
        const tagRegex = /^([0-9;]|[a-z;])*([0-9a-z;]*)$/gi
        if (!state.tags.match(tagRegex)) {
            dispatch({ type: 'field', fieldName: 'error', payload: "Tag error" })
            return;
        }

        dispatch({ type: 'toggle', toggleName: 'isFetching' })

        const thread: ThreadRequest = {
            title: state.title,
            content: state.content,
            tags: state.tags
        }

        if (props.thread) {
            ThreadAPI.updateThread(thread, props.thread.ID)
                .then(() => navigate(-1))
                .catch(err => dispatch({ type: 'field', fieldName: 'error', payload: err }))
                .finally(() => dispatch({ type: 'toggle', toggleName: 'isFetching' }));

        } else {
            ThreadAPI.createThread(thread)
                .then(() => navigate("/"))
                .catch(err => dispatch({ type: 'field', fieldName: 'error', payload: err }))
                .finally(() => dispatch({ type: 'toggle', toggleName: 'isFetching' }));
        }
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
                inputProps={{
                    maxLength: 10000,
                }}
            />
            <TextField fullWidth onChange={onTagsChange}
                value={state.tags}
                id="tags-field"
                label="Tags (optional)"
                margin="dense"
                error={state.error.match("Tag error") !== null}
                helperText="Tags can only be alphanumeric characters, separated by semicolons"
                inputProps={{
                    maxLength: 1000,
                }}
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