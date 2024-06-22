import "./navbar.css";


const Navbar = () => {
    return(
        <div id="body">
            <div id="right_navbar">
                <button id="home_icon">
                    {/* <img alt="" src={home}></img> */}
                </button>
                
                <button id="detail_button">Detail</button>
            </div>
            
            <div id="left_navbar">
                <button id="logout_button">Logout</button>
            </div>
        </div>
    )
}

export default Navbar