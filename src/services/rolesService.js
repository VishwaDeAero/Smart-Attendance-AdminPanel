import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/roles`

export const getAllRoles = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// export const createRole = async (roleData) => {
//   try {
//     const response = await axios.post(BASE_URL, roleData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

export const getRole = async (roleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${roleId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// export const updateRole = async (roleId, updatedRoleData) => {
//   try {
//     const response = await axios.patch(`${BASE_URL}/${roleId}`, updatedRoleData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const deleteRole = async (roleId) => {
//   try {
//     await axios.delete(`${BASE_URL}/${roleId}`);
//   } catch (error) {
//     throw error.response.data;
//   }
// };
