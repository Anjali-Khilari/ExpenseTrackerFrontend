import axios from "axios";

const API_URL = "http://localhost:9191/auth";

export const login = async (email, password) => {

    const response = await axios.post(
        `${API_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data;
};

export const register = async (name, email, password) => {

    const response = await axios.post(

        `${API_URL}/register`,

        {
            username: name,
            email: email,
            password: password
        }

    );

    return response.data;
};