import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={
              isLogin ?
                <Login onToggle={handleToggleAuth} /> :
                <Navigate to="/register" replace />
            } />
            <Route path="/register" element={
              !isLogin ?
                <Register onToggle={handleToggleAuth} /> :
                <Navigate to="/login" replace />
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
