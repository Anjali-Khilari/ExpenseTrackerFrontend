import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
function Navbar({

    darkMode,

    setDarkMode

}) {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-dark bg-dark shadow">

            <div className="container">

			<div className="d-flex align-items-center">

			    <span className="navbar-brand">

			        Expense Tracker

			    </span>

			</div>
			
			
			<button

			    className="btn btn-warning me-3"

			    onClick={() =>

			        setDarkMode(

			            !darkMode

			        )

			    }

			>

			    {

			        darkMode

			        ?

			        "☀ Light"

			        :

			        "🌙 Dark"

			    }
				
				

			</button>
			
			<Link

							    to="/profile"

							    className="btn btn-info me-3"

							>

							    Profile

							</Link>
							
							
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;