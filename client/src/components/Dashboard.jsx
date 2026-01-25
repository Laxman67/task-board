import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, tasksAPI } from '../services/api';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import Header from './Header';
import ProjectSidebar from './ProjectSidebar';
import Tasks from './Tasks';
import ProjectFormModal from './ProjectFormModal';
import TasksFormModal from './TasksFormModal';

const Dashboard = () => {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'Todo' });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject._id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedProject(response.data.data[0]);
      }
    } catch (err) {
      // Error is already handled in API service with toast
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const response = await tasksAPI.getByProject(projectId);
      setTasks(response.data.data);
    } catch (err) {
      // Error is already handled in API service with toast
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.create(projectForm);
      setProjectForm({ name: '', description: '' });
      setShowProjectForm(false);
      fetchProjects();
    } catch (err) {
      // Error is already handled in API service with toast
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.create(selectedProject._id, taskForm);
      setTaskForm({ title: '', description: '', status: 'Todo' });
      setShowTaskForm(false);
      fetchTasks(selectedProject._id);
    } catch (err) {
      // Error is already handled in API service with toast
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await tasksAPI.update(taskId, { status: newStatus });
      fetchTasks(selectedProject._id);
    } catch (err) {
      // Error is already handled in API service with toast
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      fetchTasks(selectedProject._id);
    } catch (err) {
      // Error is already handled in API service with toast
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return <Circle className="h-5 w-5 text-gray-400 text-extrabold " />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-amber-600  text-extrabold" />;
      case 'Done':
        return <CheckCircle className="h-5 w-5 text-green-500 text-extrabold" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400 text-extrabold" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header logout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Sidebar */}
          <ProjectSidebar projects={projects} setSelectedProject={setSelectedProject} setShowProjectForm={setShowProjectForm} selectedProject={selectedProject} />

          {/* Tasks Area */}
          <Tasks setShowTaskForm={setShowTaskForm} selectedProject={selectedProject} tasks={tasks} getStatusIcon={getStatusIcon} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
        </div>
      </main>

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectFormModal createProject={createProject} projectForm={projectForm} setProjectForm={setProjectForm} setShowProjectForm={setShowProjectForm} />
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <TasksFormModal createTask={createTask} taskForm={taskForm} setTaskForm={setTaskForm} setShowTaskForm={setShowTaskForm} />
      )}
    </div>
  );
};

export default Dashboard;
