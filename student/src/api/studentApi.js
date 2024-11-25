import axios from 'axios';

export const createOrUpdateProfile = async (profileData) => {
  try {
    const res = await axios.post('/api/students/profile', profileData);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async (rollNumber) => {
  try {
    const res = await axios.get(`/api/students/profile/${rollNumber}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
