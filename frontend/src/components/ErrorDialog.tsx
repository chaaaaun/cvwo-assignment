import { Button, Stack, Typography } from "@mui/material";

export function ErrorDialog(props: { errMsg: string, retryFn: () => void }) {
    return (
        <Stack spacing={1} alignItems="center">
            <Typography variant='h4'>An error has occured</Typography>
            <Typography variant='body1'>{props.errMsg}</Typography>
            <Button variant="contained" onClick={props.retryFn}>Retry</Button>
        </Stack>
    )
}