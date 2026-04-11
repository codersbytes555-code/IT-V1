import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Container } from './components/layout/Container';
import { AppRoutes } from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: '2rem 0' }}>
        <Container>
          <AppRoutes />
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
