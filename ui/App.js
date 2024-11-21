import React from 'react';
import EventCheckInDashboard from './components/EventCheckInDashboard';
import { AppProvider } from './context/AppProvider';

export const App = () => (
  <AppProvider>
    <EventCheckInDashboard />
  </AppProvider>
);
