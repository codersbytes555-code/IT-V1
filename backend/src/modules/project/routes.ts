import { Router } from 'express';
import { createProject, getProjectsByClient } from './controller';

const router = Router();

router.post('/', createProject);
router.get('/:clientId', getProjectsByClient);

export default router;
