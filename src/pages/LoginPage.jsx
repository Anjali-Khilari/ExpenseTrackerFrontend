import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

import { toast } from "react-toastify";

function LoginPage() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await login(
                email,
                password
            );

            localStorage.setItem(
                "token",
                response.token
            );
			localStorage.setItem(

			    "email",

			    email

			);

			localStorage.setItem(

			    "username",

			    email.split("@")[0]

			);
			toast.success(
			    "Login successful"
			);

            navigate("/expenses");

        }
        catch (error) {

			toast.error(
			    "Invalid credentials"
			);

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Expense Tracker Login
                            </h2>

                            <input
                                className="form-control mb-3"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <input
                                className="form-control mb-3"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
							
							
							<div className="text-center mt-3">

							    <p>

							        New user?

							    </p>

							    <button
							        className="btn btn-outline-success"
							        onClick={() =>
							            navigate("/register")
							        }
							    >

							        Register Here

							    </button>

							</div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default LoginPage;