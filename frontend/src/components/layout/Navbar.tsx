import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, LayoutDashboard, SendToBack, Briefcase } from 'lucide-react';
import { Container } from './Container';

export const Navbar: React.FC = () => {
  return (
    <header className="nav-bar">
      <Container className="nav-container">
        <NavLink to="/" className="nav-brand">
          <LayoutDashboard size={28} />
          <span>Lead CRM</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/leads" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}><Users size={18}/> Leads</span>
          </NavLink>
          <NavLink to="/clients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}><SendToBack size={18}/> Clients</span>
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}><Briefcase size={18}/> Projects</span>
          </NavLink>
        </nav>
      </Container>
    </header>
  );
};
