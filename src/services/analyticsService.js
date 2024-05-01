import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/analytics`

export const getAttendanceStats = async (filterData, auth) => {
  try {
    const response = await axios.post(`${BASE_URL}/stats`, filterData, {
        headers: {
          Authorization: `${auth}`
        }
      });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDailyStats = async (filterData, auth) => {
  try {
    const response = await axios.post(`${BASE_URL}/dailystats`, filterData, {
        headers: {
          Authorization: `${auth}`
        }
      });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
