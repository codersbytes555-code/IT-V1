import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import { fetchProjectsByClient } from '../api';
import type { Project } from '../types';
import { Button } from '../../../components/ui/Button';

export const ProjectList: React.FC = () => {
  const { clientId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (clientId) loadProjects();
  }, [clientId]);

  const loadProjects = async () => {
    try {
      const data = await fetchProjectsByClient(Number(clientId));
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/clients" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16}/> Back to Clients
        </Link>
      </div>
      
      <div className="page-header">
        <h1>Projects for Client #{clientId}</h1>
        <Link to={`/clients/${clientId}/projects/new`} className="btn btn-primary">
          <Plus size={18} /> New Project
        </Link>
      </div>

      <div className="grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3>{project.title}</h3>
              <span className={`badge`} style={{
                background: project.status === 'completed' ? '#d1fae5' : project.status === 'in-progress' ? '#fef3c7' : '#e0e7ff',
                color: project.status === 'completed' ? '#059669' : project.status === 'in-progress' ? '#d97706' : '#4338ca',
              }}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
      {projects.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>No projects found for this client.</p>}
    </div>
  );
};
