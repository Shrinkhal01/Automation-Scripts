import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products/');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch product ${id}: ${error.message}`);
  }
};

export const scrapeProducts = async () => {
  try {
    const response = await api.post('/products/scrape');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to scrape products: ${error.message}`);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete product ${id}: ${error.message}`);
  }
};

export default api;