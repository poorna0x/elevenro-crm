// Simple authentication system using database credentials
import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'technician';
  technicianId?: string;
  fullName?: string;
}

// Admin credentials (in production, store these securely)
const ADMIN_CREDENTIALS = [
  { email: 'admin@roservice.com', password: 'admin123' },
  { email: 'admin@yourdomain.com', password: 'admin123' },
  { email: 'poorna@hydrogenro.com', password: 'admin123' }
];

export const authenticateUser = async (email: string, password: string): Promise<AuthUser | null> => {
  try {
    // Check if it's an admin
    const adminCred = ADMIN_CREDENTIALS.find(cred => 
      cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );
    
    if (adminCred) {
      return {
        id: 'admin-' + Date.now(),
        email: adminCred.email,
        role: 'admin'
      };
    }

    // Check if it's a technician
    const { data: technician, error } = await supabase
      .from('technicians')
      .select('id, full_name, email, password, account_status')
      .eq('email', email.toLowerCase())
      .eq('account_status', 'ACTIVE')
      .single();

    if (technician && !error && technician.password === password) {
      return {
        id: technician.id,
        email: technician.email,
        role: 'technician',
        technicianId: technician.id,
        fullName: technician.full_name
      };
    }

    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Simple session storage
export const setAuthSession = (user: AuthUser) => {
  localStorage.setItem('auth_user', JSON.stringify(user));
};

export const getAuthSession = (): AuthUser | null => {
  try {
    const userData = localStorage.getItem('auth_user');
    if (!userData) return null;
    
    const user = JSON.parse(userData);
    
    // Validate user object has required fields
    if (!user || !user.id || !user.email || !user.role) {
      clearAuthSession();
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error getting auth session:', error);
    clearAuthSession();
    return null;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem('auth_user');
};
