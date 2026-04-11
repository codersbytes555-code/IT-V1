import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createLead } from '../api';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export const AddLead: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead(formData);
      navigate('/leads');
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
        <h2 style={{ marginBottom: '1.5rem' }}>Add New Lead</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          <Input label="Source (e.g. Website, Facebook)" name="source" value={formData.source} onChange={handleChange} required />
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit">Create Lead</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
