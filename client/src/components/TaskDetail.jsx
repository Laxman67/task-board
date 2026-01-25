import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Edit2, Trash2, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

import axios from 'axios';

const TaskDetail = () => {
  const { taskId, projectId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    status: 'Todo'
  });
  const [projectName, setProjectName] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [taskId]);



  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
        withCredentials: true
      });
      const data = response.data;
      console.log(data.data.projectId);


      if (data.success) {



        const taskData = data.data || data;


        setProjectName(taskData?.projectId?.name);
        setTask(taskData);
        setEditedTask(taskData);
      } else {
        toast.error('Task not found');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Error fetching task');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { title: editedTask.title, description: editedTask.description, status: editedTask.status }, {
        withCredentials: true
      });
      const data = response.data;


      if (data.success) {
        toast.success('Task updated successfully');
        navigate(`/tasks/${taskId}`);
        setIsEditing(false)
        fetchTask()

      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      toast.error('Error updating task');
    }
  };

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {


      try {
        const response = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
          withCredentials: true
        });
        const data = response.data;

        if (data.success) {
          toast.success('Task deleted successfully');
          navigate(`/dashboard`);

        }
      } catch (error) {
        toast.error('Error while deleting  task');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Todo':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Done':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Task not found</p>
          <Link to="/dashboard" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>

          {/* Task Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
            {/* Task Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 outline-none w-full"
                  />
                ) : (
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                      {task.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600 font-medium">Project:</span>
                      <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {projectName}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateTask}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedTask(task);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteTask}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Task Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Status */}
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {isEditing ? (
                    <select
                      value={editedTask.status}
                      onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                      className="mt-1 text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(task.createdAt)}
                  </p>
                </div>
              </div>

              {/* Updated Date */}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(task.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              {isEditing ? (
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Add a description..."
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  {task.description ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{task.description}</p>
                  ) : (
                    <p className="text-gray-500 italic">No description provided</p>
                  )}
                </div>
              )}
            </div>

            {/* Project Info */}
            {task.project && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project</h2>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">
                      {task.project.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{task.project.name}</p>
                    {task.project.description && (
                      <p className="text-sm text-gray-600">{task.project.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
