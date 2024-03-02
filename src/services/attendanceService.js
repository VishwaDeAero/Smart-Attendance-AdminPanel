import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/attendances`

export const getAllAttendances = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addAttendance = async (attendanceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, attendanceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAttendance = async (attendanceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${attendanceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
