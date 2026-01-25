import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Simple helper function to get token from cookies
const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Simple API wrapper functions
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response;
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
      return response;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const projectsAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`, {
        withCredentials: true // This is crucial for sending cookies
      });
      return response;
    } catch (error) {
      console.error('Get projects error:', error.response?.data || error.message);
      throw error;
    }
  },

  create: async (projectData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
        withCredentials: true // This is crucial for sending cookies
      });
      return response;
    } catch (error) {
      console.error('Create project error:', error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, projectData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData, {
        withCredentials: true
      });
      return response;
    } catch (error) {
      console.error('Update project error:', error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, {
        withCredentials: true
      });
      return response;
    } catch (error) {
      console.error('Delete project error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const tasksAPI = {
  getByProject: async (projectId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/tasks`, {
        withCredentials: true
      });

      console.log(" getByProject: async");
      console.log(response);

      return response;
    } catch (error) {
      console.error('Get tasks error:', error.response?.data || error.message);
      throw error;
    }
  },

  create: async (projectId, taskData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/tasks`, taskData, {
        withCredentials: true
      });
      return response;
    } catch (error) {
      console.error('Create task error:', error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData, {
        withCredentials: true
      });
      return response;
    } catch (error) {
      console.error('Update task error:', error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        withCredentials: true
      });
      return response;
    } catch (error) {
      console.error('Delete task error:', error.response?.data || error.message);
      throw error;
    }
  }
};
