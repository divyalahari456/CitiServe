import axios from 'axios';

const API_URL = 'http://localhost:5000/api/laws';

export const getAllLaws = async (search = '') => {
  const params = search ? { search } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const getLawsByCategory = async (categoryName) => {
  const response = await axios.get(`${API_URL}/category/${encodeURIComponent(categoryName)}`);
  return response.data;
};
