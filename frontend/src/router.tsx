import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CommentList, { commentsLoader } from "./components/CommentList";
import CreateNewThread from "./pages/CreateThread";
import EditThread from "./pages/EditThread";
import ErrorPage from "./pages/ErrorPage";
import ThreadListPage, { threadListLoader } from "./pages/ThreadListPage";
import ThreadView, { threadViewLoader } from "./pages/ThreadView";
import { RequireAuth } from "./services/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "threads/:page",
                element: <ThreadListPage />,
                loader: threadListLoader,
                errorElement: <ErrorPage />,
            },
            {
                path: "thread/:id",
                element: <ThreadView />,
                loader: threadViewLoader,
                children: [
                    {
                        path: ":page",
                        element: <CommentList />,
                        loader: commentsLoader
                    }
                ]
            },
            {
                path: "thread/new",
                element: <RequireAuth><CreateNewThread /></RequireAuth>,
            },
            {
                path: "thread/edit",
                element: <RequireAuth><EditThread /></RequireAuth>,
            }
        ]
    },
]);

export default router;