import express from 'express';
import auth from '../middleware/auth.js';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  validateTask
} from '../controllers/taskController.js';

const router = express.Router();

router.use(auth);

router.get('/projects/:projectId/tasks', getTasks);
router.post('/projects/:projectId/tasks', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;
