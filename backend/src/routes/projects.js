import express from 'express';
import auth from '../middleware/auth.js';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  validateProject
} from '../controllers/projectController.js';

const router = express.Router();

router.use(auth);

router.get('/', getProjects);
router.post('/', validateProject, createProject);
router.put('/:id', validateProject, updateProject);
router.delete('/:id', deleteProject);

export default router;
