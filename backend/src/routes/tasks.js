import express from 'express';
import auth from '../middleware/auth.js';
import {
  getTaskById,
  getTasksByProjectId,
  createTaskByProjectId,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.use(auth);

router.get('/:id', getTaskById);
router.get('/projects/:projectId/tasks', getTasksByProjectId);
router.post('/projects/:projectId/tasks', createTaskByProjectId);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
