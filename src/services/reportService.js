import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/reports`

export const getStudentAttendance = async (attendanceData, auth) => {
  try {
    const response = await axios.post(`${BASE_URL}/student`, attendanceData, {
        headers: {
          Authorization: `${auth}`
        }
      });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubjectAttendance = async (attendanceData, auth) => {
  try {
    const response = await axios.post(`${BASE_URL}/subject`, attendanceData, {
        headers: {
          Authorization: `${auth}`
        }
      });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getLectureAttendance = async (attendanceData, auth) => {
  try {
    const response = await axios.post(`${BASE_URL}/lecture`, attendanceData, {
        headers: {
          Authorization: `${auth}`
        }
      });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
