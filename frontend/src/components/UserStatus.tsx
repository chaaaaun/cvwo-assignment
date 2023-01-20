import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

function UserStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    const checkJwt = () => {
        let token = Cookies.get("jwt")
        if (token !== undefined) {
            fetch("/user", { credentials: "include" })
                .then((response) => response.json())
                .then((data) => {
                    auth.setUser(data.user)
                    navigate("/")
                })
                .catch(() => auth.logout(() => { }))
        }
    }

    if (!auth.user) {
        return <Link to="/login" onClick={checkJwt}>Login</Link>;
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
