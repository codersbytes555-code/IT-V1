import { Routes, Route } from 'react-router-dom';
import { LeadList } from '../modules/lead/pages/LeadList';
import { AddLead } from '../modules/lead/pages/AddLead';
import { RequirementForm } from '../modules/requirement/pages/RequirementForm';
import { ClientList } from '../modules/client/pages/ClientList';
import { ProjectList } from '../modules/project/pages/ProjectList';
import { CreateProject } from '../modules/project/pages/CreateProject';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LeadList />} />
      <Route path="/leads" element={<LeadList />} />
      <Route path="/leads/add" element={<AddLead />} />
      <Route path="/leads/:leadId/requirements" element={<RequirementForm />} />
      <Route path="/clients" element={<ClientList />} />
      <Route path="/clients/:clientId/projects" element={<ProjectList />} />
      <Route path="/clients/:clientId/projects/new" element={<CreateProject />} />
    </Routes>
  );
};
