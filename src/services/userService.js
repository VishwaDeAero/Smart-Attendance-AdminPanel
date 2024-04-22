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

export const getAllLecturers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const lecturers = (response.data.data).filter(item => item.role?.name === 'Lecturer')
    return lecturers;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUser = async (userData, auth) => {
  try {
    const response = await axios.post(BASE_URL, userData, {
      headers: {
        Authorization: `${auth}`
      }
    });
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

export const updateUser = async (userId, updatedUserData, auth) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${userId}`, updatedUserData, {
      headers: {
        Authorization: `${auth}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId, auth) => {
  try {
    await axios.delete(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `${auth}`
      }
    });
  } catch (error) {
    throw error.response.data;
  }
};
