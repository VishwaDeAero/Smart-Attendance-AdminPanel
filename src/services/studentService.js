import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/students`

export const getAllStudents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getStudent = async (studentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateStudent = async (studentId, updatedStudentData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${studentId}`, updatedStudentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`${BASE_URL}/${studentId}`);
  } catch (error) {
    throw error.response.data;
  }
};
