import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "../pages/RegisterPage";

import LoginPage from "../pages/LoginPage";
import ExpenseListPage from "../pages/ExpenseListPage";

import { Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import ProfilePage from "../pages/ProfilePage";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
			
			<Route

			    path="/profile"

			    element={

			        <ProtectedRoute>

			            <ProfilePage/>

			        </ProtectedRoute>

			    }

			/>
			
			<Route
			    path="/register"
			    element={<RegisterPage />}
			/>
			<Route
			    path="/"
			    element={<Navigate to="/login" />}
			/>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

				<Route
				    path="/expenses"
				    element={
				        <ProtectedRoute>

				            <ExpenseListPage />

				        </ProtectedRoute>
				    }
				/>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;