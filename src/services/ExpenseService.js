import axios from "axios";

const API_URL = "http://localhost:9191/api/expenses";

export const getExpenses = async (page = 0) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const createExpense = async (expense) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        expense,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteExpense = async (id) => {

    const token = localStorage.getItem("token");

    await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const updateExpense = async (id, expense) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${id}`,
        expense,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};