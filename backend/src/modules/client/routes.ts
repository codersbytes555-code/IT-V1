import { Router } from 'express';
import { createClient, getClients } from './controller';

const router = Router();

router.post('/', createClient);
router.get('/', getClients);

export default router;
