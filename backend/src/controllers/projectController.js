import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { projectSchema } from '../middleware/validate.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { error } = projectSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details
      })
    }

    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      userId: req.user._id
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

export const updateProject = async (req, res, next) => {
  try {


    const { name, description } = req.body;
    const { id } = req.params;

    const project = await Project.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name, description },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or access denied'
      })
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or access denied'
      })
    }

    await Task.deleteMany({ projectId: id });

    res.json({
      success: true,
      message: 'Project and its tasks deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};

