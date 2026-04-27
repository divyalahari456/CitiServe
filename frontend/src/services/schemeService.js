import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schemes';

export const getSchemes = async (filters = {}) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};
