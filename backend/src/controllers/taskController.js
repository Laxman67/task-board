
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { taskSchema } from '../middleware/validate.js';

export const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    const tasks = await Task.find({ projectId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

export const createTaskByProjectId = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details
      })
    }

    const { title, description, status } = req.body;
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or operation not allowed'
      })
    }

    const task = new Task({
      title,
      description,
      status: status || 'Todo',
      projectId
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

export const updateTask = async (req, res, next) => {
  try {

    const { title, description, status } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required"
      })
    }

    const task = await Task.findById(id).populate("projectId");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      })
    }

    // Check if user is authorized to update the task
    if (req.user._id.toString() !== task.projectId.userId.toString()) {

      return res.status(403).json({
        success: false,
        message: "Access denied"
      })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate('projectId');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      })
    }

    if (task.projectId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      })
    }

    await Task.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};




