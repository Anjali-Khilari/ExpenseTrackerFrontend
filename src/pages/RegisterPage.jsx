import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { register } from "../services/AuthService";

function RegisterPage() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

        try {

            await register(

                name,
                email,
                password

            );

			toast.success(
			    "Registration successful"
			);

            navigate("/login");

        }

        catch (error) {

			toast.error(
			    "Registration failed"
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
						    Expense Tracker Register
						</h2>
						
                            <input
                                className="form-control mb-3"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

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
                                className="btn btn-success w-100"
                                onClick={handleRegister}
                            >

                                Register

                            </button>
							
							<div className="text-center mt-3">

							    <button
							        className="btn btn-outline-primary"
							        onClick={() =>
							            navigate("/login")
							        }
							    >

							        Back to Login

							    </button>

							</div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RegisterPage;