import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/users`

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
