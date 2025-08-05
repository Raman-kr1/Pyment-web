import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthCtx } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import DonationPage from './pages/Donation';

// A wrapper to protect routes that require login
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthCtx);
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const mainStyle = {
    paddingTop: '80px', // Pushes content below the fixed navbar
  };

  return (
    <BrowserRouter>
      <Navbar />
      <main style={mainStyle}>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/donate" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}