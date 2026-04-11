import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
import { fetchLeads, updateLeadStatus } from '../api';
import type { Lead } from '../types';
import { Button } from '../../../components/ui/Button';

export const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    try {
      await updateLeadStatus(id, newStatus);
      if (newStatus === 'converted') {
        // Automatically convert to client in backend is omitted, but let's assume we do it manually or via hook
        // For simplicity, CRM workflow is just status change here. Realistically, we'd fire createClient API.
        // Let's redirect to requirements if they contact them? 
      }
      loadLeads();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Leads</h1>
        <Button onClick={() => navigate('/leads/add')}>
          <Plus size={18} /> Add Lead
        </Button>
      </div>

      <div className="grid-cols-3">
        {leads.map((lead) => (
          <div key={lead.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3>{lead.name}</h3>
              <span className={`badge badge-${lead.status}`}>{lead.status}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              {lead.email} <br />
              Source: {lead.source}
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <select 
                className="select" 
                value={lead.status} 
                onChange={(e) => handleStatusChange(lead.id, e)}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="dead">Dead</option>
              </select>

              {(lead.status === 'contacted' || lead.status === 'converted') && (
                <Link to={`/leads/${lead.id}/requirements`} className="btn btn-outline" style={{ justifyContent: 'space-between' }}>
                  Requirements Form <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      {leads.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>No leads found. Create one!</p>}
    </div>
  );
};
