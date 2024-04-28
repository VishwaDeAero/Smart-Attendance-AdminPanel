import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/enrolments`


export const createEnrolment = async (enrollData, auth) => {
    try {
        const response = await axios.post(BASE_URL, enrollData, {
            headers: {
                Authorization: `${auth}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getEnrolmentsByStudent = async (studentId, auth) => {
    try {
        const response = await axios.get(`${BASE_URL}/${studentId}`, {
            headers: {
                Authorization: `${auth}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteEnrolment = async (enrollId, auth) => {
  try {
    await axios.delete(`${BASE_URL}/${enrollId}`, {
        headers: {
            Authorization: `${auth}`
        }
    });
  } catch (error) {
    throw error.response.data;
  }
};
