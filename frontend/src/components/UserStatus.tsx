import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const UserStatus: React.FC = () => {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <Link to="/login">Login</Link>;
    } else {
        return (
            <p>
                Welcome {auth.user}!{" "}
                <button
                    onClick={() => {
                        auth.logout(() => navigate("/"));
                    }}
                >
                    Logout
                </button>
            </p>
        );
    }
}

export default UserStatus;
