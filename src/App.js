import React from 'react';
import { ProducersProvider } from './contexts/ProducersContext';
import { DashboardsProvider } from './contexts/DashboardContext';
import AppRouter from './routes';
import { CulturesProvider } from './contexts/CulturesContext';

import './App.css';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


function App() {
  return (
    <DashboardsProvider>
      <CulturesProvider>
        <ProducersProvider>
          <AppRouter />
        </ProducersProvider>
      </CulturesProvider>
    </DashboardsProvider>
  );
}

export default App;
