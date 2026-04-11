import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createProject } from '../api';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';

export const CreateProject: React.FC = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'start' as const,
    clientId: Number(clientId)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject(formData);
      navigate(`/clients/${clientId}/projects`);
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}
      >
        <ArrowLeft size={16}/> Back
      </button>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Project Title" name="title" value={formData.title} onChange={handleChange} required />
          <Textarea label="Project Description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
