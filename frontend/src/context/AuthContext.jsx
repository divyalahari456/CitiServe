/**
 * AuthContext - Global authentication state management.
 * Handles login, registration, logout, and token persistence.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check localStorage for existing token
  useEffect(() => {
    const storedUser = localStorage.getItem('citiserve_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        // Set default auth header for all axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
      } catch {
        localStorage.removeItem('citiserve_user');
      }
    }
    setLoading(false);
  }, []);

  // Register
  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password, role });
      const userData = res.data.data;
      setUser(userData);
      localStorage.setItem('citiserve_user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      toast.success('Registration successful! Welcome to Citi-Serve.');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const userData = res.data.data;
      setUser(userData);
      localStorage.setItem('citiserve_user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('citiserve_user');
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
