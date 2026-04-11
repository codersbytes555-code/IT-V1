import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Select } from '../../../components/ui/Select';
import { TagInput } from '../../../components/ui/TagInput';
import { Button } from '../../../components/ui/Button';
import { getRequirement, createRequirement } from '../api';

export const RequirementForm: React.FC = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [existingId, setExistingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    technologyStack: [] as string[],
    specialRequirements: '',
    estimatedDays: 30,
    targetAudience: '',
    developersRequired: 1,
    experienceLevel: 'mid',
    budget: 0,
    paymentType: 'fixed',
    hourlyRate: 0,
    leadId: Number(leadId)
  });

  useEffect(() => {
    if (leadId) {
      getRequirement(Number(leadId))
        .then(req => {
          setExistingId(req.id);
          setFormData({
            ...req,
            specialRequirements: req.specialRequirements || '',
            targetAudience: req.targetAudience || '',
            hourlyRate: req.hourlyRate || 0,
          });
        })
        .catch(() => { /* not found, just use empty form */ });
    }
  }, [leadId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  const handleTags = (tags: string[]) => setFormData({ ...formData, technologyStack: tags });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!existingId) {
        await createRequirement(formData);
        alert("Requirement saved successfully!");
      } else {
        alert("Updating existing requirement is not implemented in this demo.");
      }
      navigate('/leads');
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn" style={{ background: 'none', color: 'var(--text-muted)', marginBottom: '1rem', padding: 0 }}>
        <ArrowLeft size={16}/> Back
      </button>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Project Requirements (Lead #{leadId})</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-section">
            <div className="form-section-title">Basic Info</div>
            <Input label="Project Title" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
            <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
            <TagInput label="Technology Stack" tags={formData.technologyStack} onChange={handleTags} />
          </div>

          <div className="form-section">
            <div className="form-section-title">Planning</div>
            <div className="grid-cols-2">
              <Input label="Estimated Days" type="number" name="estimatedDays" value={formData.estimatedDays} onChange={handleChange} min={1} required />
              <Input label="Developers Required" type="number" name="developersRequired" value={formData.developersRequired} onChange={handleChange} min={1} required />
              <Select 
                label="Experience Level" 
                name="experienceLevel" 
                value={formData.experienceLevel} 
                onChange={handleChange} 
                options={[{label: 'Junior', value: 'junior'}, {label: 'Mid Level', value: 'mid'}, {label: 'Senior', value: 'senior'}]} 
              />
              <Input label="Target Audience" name="targetAudience" value={formData.targetAudience} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Budget Details</div>
            <div className="grid-cols-2">
              <Input label="Total Budget ($)" type="number" name="budget" value={formData.budget} onChange={handleChange} required min={0} />
              
              <div className="input-group">
                <label className="input-label">Payment Type</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="paymentType" value="fixed" checked={formData.paymentType === 'fixed'} onChange={handleChange} /> Fixed
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="paymentType" value="hourly" checked={formData.paymentType === 'hourly'} onChange={handleChange} /> Hourly
                  </label>
                </div>
              </div>
            </div>
            
            {formData.paymentType === 'hourly' && (
              <Input label="Hourly Rate ($/hr)" type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required min={1} />
            )}
            
            <Textarea label="Special Requirements (Optional)" name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} rows={2} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <Button type="submit" disabled={!!existingId}>
              {existingId ? "Already Saved" : "Save Requirements"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
