import { Router } from 'express';
import { createRequirement, getRequirementByLead } from './controller';

const router = Router();

router.post('/', createRequirement);
router.get('/:leadId', getRequirementByLead);

export default router;
