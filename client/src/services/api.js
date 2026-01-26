import axios from 'axios';
import { toast } from 'react-toastify';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Simple API wrapper functions
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
        withCredentials: true // This is crucial for sending cookies
      });
      toast.success('Registration successful!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      // console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
        withCredentials: true // This is crucial for sending cookies
      });
      toast.info('Login successful!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      // console.error('Login error:', error.response?.data || error.message);
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
      const errorMessage = error.response?.data?.message || 'Failed to fetch projects';
      toast.error(errorMessage);
      // console.error('Get projects error:', error.response?.data || error.message);
      throw error;
    }
  },

  create: async (projectData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
        withCredentials: true // This is crucial for sending cookies
      });
      toast.success('Project created successfully!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create project';
      toast.error(errorMessage);
      // console.error('Create project error:', error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, projectData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData, {
        withCredentials: true
      });
      toast.success('Project updated successfully!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update project';
      toast.error(errorMessage);
      // console.error('Update project error:', error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, {
        withCredentials: true
      });
      toast.success('Project deleted successfully!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete project';
      toast.error(errorMessage);
      // console.error('Delete project error:', error.response?.data || error.message);
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

      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch tasks';
      toast.error(errorMessage);
      // console.error('Get tasks error:', error.response?.data || error.message);
      throw error;
    }
  },

  create: async (projectId, taskData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/tasks`, taskData, {
        withCredentials: true
      });
      toast.success('Task created successfully!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create task';
      toast.error(errorMessage);
      // console.error('Create task error:', error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData, {
        withCredentials: true
      });
      toast.success('Task updated successfully!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update task';
      toast.error(errorMessage);
      // console.error('Update task error:', error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        withCredentials: true
      });
      toast.warning('Task deleted successfully!');
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete task';
      toast.error(errorMessage);
      // console.error('Delete task error:', error.response?.data || error.message);
      throw error;
    }
  }
};
