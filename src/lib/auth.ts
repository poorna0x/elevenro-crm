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
    console.log('Authenticating user:', email);
    
    // Check if it's an admin
    const adminCred = ADMIN_CREDENTIALS.find(cred => 
      cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
    );
    
    if (adminCred) {
      console.log('Admin authentication successful');
      return {
        id: 'admin-' + Date.now(),
        email: adminCred.email,
        role: 'admin'
      };
    }

    // Check if it's a technician
    console.log('Checking technician auth for:', email);
    
    // First, let's check if the technicians table has the required columns
    const { data: technician, error } = await supabase
      .from('technicians')
      .select('id, full_name, email, password, account_status')
      .eq('email', email.toLowerCase())
      .single();

    console.log('Technician query result:', { technician, error });
    
    if (error) {
      console.error('Database error:', error);
      // If the error is about missing columns, let's try without them
      if (error.message.includes('password') || error.message.includes('account_status')) {
        console.log('Trying without password/account_status columns...');
        const { data: techWithoutAuth, error: techError } = await supabase
          .from('technicians')
          .select('id, full_name, email')
          .eq('email', email.toLowerCase())
          .single();
        
        if (techWithoutAuth && !techError) {
          console.log('Found technician but missing auth columns. Please run the SQL scripts to add password and account_status fields.');
          return null;
        }
      }
      return null;
    }
    
    if (technician) {
      // Check if password and account_status exist
      if (!technician.password) {
        console.log('Technician found but no password set');
        return null;
      }
      
      if (technician.account_status !== 'ACTIVE') {
        console.log('Technician account is not active:', technician.account_status);
        return null;
      }
      
      if (technician.password === password) {
        console.log('Technician authentication successful');
        return {
          id: technician.id,
          email: technician.email,
          role: 'technician',
          technicianId: technician.id,
          fullName: technician.full_name
        };
      } else {
        console.log('Password mismatch');
      }
    } else {
      console.log('No technician found with email:', email);
    }

    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Simple session storage
export const setAuthSession = (user: AuthUser) => {
  try {
    localStorage.setItem('auth_user', JSON.stringify(user));
    console.log('Session saved:', user);
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getAuthSession = (): AuthUser | null => {
  try {
    const userData = localStorage.getItem('auth_user');
    if (!userData) {
      console.log('No session found in localStorage');
      return null;
    }
    
    const user = JSON.parse(userData);
    console.log('Retrieved session from localStorage:', user);
    
    // Validate user object has required fields
    if (!user || !user.id || !user.email || !user.role) {
      console.log('Invalid session data, clearing...');
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
  try {
    localStorage.removeItem('auth_user');
    console.log('Session cleared');
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};
