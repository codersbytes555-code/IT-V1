import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler } from './common/middlewares';

import leadRoutes from './modules/lead/routes';
import requirementRoutes from './modules/requirement/routes';
import clientRoutes from './modules/client/routes';
import projectRoutes from './modules/project/routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
