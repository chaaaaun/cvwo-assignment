import { ThreadDetails } from "../types/DataModels";

const createThread = async (thread: ThreadDetails) => {
    let res = await fetch("/api/thread", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(thread),
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const ApiService = { createThread }
export default ApiService;