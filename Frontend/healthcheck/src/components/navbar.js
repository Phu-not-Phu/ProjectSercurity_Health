import "./navbar.css";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";


const Navbar = ({onShowOverlay}) => {
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = () => {logout()};
    const handleHome = () => {navigate("../home")};
    const handleUser = () => {navigate("../users")};

    return(
        <div id="body">
            <div id="right_navbar">
                <button id="home_icon" onClick={handleHome}></button>
                <button id="detail_button" onClick={onShowOverlay}></button>
                <button id="users_button" onClick={handleUser}></button>
            </div>
            
            <div id="left_navbar">
                <button id="logout_button" onClick={handleLogout}></button>
            </div>
        </div>
    )
}

export default Navbar