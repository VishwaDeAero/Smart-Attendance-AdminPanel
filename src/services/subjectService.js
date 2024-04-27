import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/subjects`

export const getAllSubjects = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createSubject = async (subjectData, auth) => {
  try {
    const response = await axios.post(BASE_URL, subjectData, {
      headers: {
        Authorization: `${auth}`
      }
  });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubject = async (subjectId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSubject = async (subjectId, updatedSubjectData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${subjectId}`, updatedSubjectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSubject = async (subjectId) => {
  try {
    await axios.delete(`${BASE_URL}/${subjectId}`);
  } catch (error) {
    throw error.response.data;
  }
};
