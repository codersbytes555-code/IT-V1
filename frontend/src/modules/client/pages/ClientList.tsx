import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients } from '../api';
import type { Client } from '../types';
import { Briefcase } from 'lucide-react';

export const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Clients</h1>
        <p style={{ color: 'var(--text-muted)' }}>Clients are generated when a lead is "converted".</p>
      </div>

      <div className="list-group">
        {clients.map((client) => (
          <div key={client.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>{client.lead?.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {client.lead?.email} • Source: {client.lead?.source}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {client.projects?.length} Projects
              </div>
              <Link to={`/clients/${client.id}/projects`} className="btn btn-outline">
                <Briefcase size={16} /> Manage Projects
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {clients.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--card-bg)', borderRadius: 'var(--radius)' }}>
          <p>No clients found.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Go to Leads and change a lead's status to "converted" and then call the Create Client API!</p>
        </div>
      )}
    </div>
  );
};
