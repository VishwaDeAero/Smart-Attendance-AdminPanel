import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/users`

export const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/${userId}`);
  } catch (error) {
    throw error.response.data;
  }
};
