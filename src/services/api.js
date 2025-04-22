import axios from "axios";
import { API_URL, TOKEN } from "../utils/constants";

export const getExpenses = () => {
    return axios.get(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
};

export const createExpense = (expense) => {
    return axios.post(API_URL, expense, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
};

export const updateExpense = (_id, updatedExpense) => {
    return axios.patch(`${API_URL}/${_id}`, updatedExpense, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
};

export const deleteExpense = async (_id) => {
    return axios.delete(`${API_URL}/${_id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
};
