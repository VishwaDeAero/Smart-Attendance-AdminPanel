import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/lectures`

export const getAllLectures = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getLecturesBySubject = async (subjectId) => {
  try {
    const response = await axios.get(`${BASE_URL}/subject/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createLecture = async (lectureData, auth) => {
  try {
    const response = await axios.post(BASE_URL, lectureData, {
      headers: {
        Authorization: `${auth}`
      }
  });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getLecture = async (lectureId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${lectureId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getLectureQR = async (lectureId) => {
  try {
    const response = await axios.get(`${BASE_URL}/qrtoken/${lectureId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateLecture = async (lectureId, updatedLectureData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${lectureId}`, updatedLectureData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    await axios.delete(`${BASE_URL}/${lectureId}`);
  } catch (error) {
    throw error.response.data;
  }
};
