import express from 'express';
import auth from '../middleware/auth.js';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import {
  getTasksByProjectId,
  createTaskByProjectId,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

router.use(auth);

// Project routes
router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Task routes (nested under projects)
router.get('/:projectId/tasks', getTasksByProjectId);
router.post('/:projectId/tasks', createTaskByProjectId);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
