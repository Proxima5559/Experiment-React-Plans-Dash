import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PlanDashboard from './components/PlanDashboard/PlanDashboard';
import PlanEditor from './components/PlanDashboard/PlanEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/plans" replace />} />
        <Route path="/plans" element={<PlanDashboard />} />
        <Route path="/plan/:slug" element={<PlanEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
