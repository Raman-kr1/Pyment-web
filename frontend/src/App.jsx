import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthCtx } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import DonationPage from './pages/Donation';
import Gallery from './pages/Gallery';
import Contributors from './pages/Contributors';
import Contact from './pages/Contact';


function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthCtx); // Destructure loading state


  if (loading) {
    return <div className="page-container">Checking authentication...</div>;
  }

  
  return user ? children : <Navigate to="/login" />;
}


function AppContent() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/donate" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path="/contributors" element={<ProtectedRoute><Contributors /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
