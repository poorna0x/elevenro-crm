// Test script to check technician authentication
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTechnicianAuth() {
  console.log('Testing technician authentication...');
  
  try {
    // Check if technicians exist
    const { data: technicians, error } = await supabase
      .from('technicians')
      .select('id, full_name, email, password, account_status')
      .eq('email', 'technician@roservice.com');
    
    if (error) {
      console.error('Error fetching technicians:', error);
      return;
    }
    
    console.log('Technicians found:', technicians);
    
    if (technicians && technicians.length > 0) {
      const tech = technicians[0];
      console.log('Testing login for:', tech.email);
      console.log('Password matches:', tech.password === 'technician123');
      console.log('Account status:', tech.account_status);
    } else {
      console.log('No technicians found with email technician@roservice.com');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testTechnicianAuth();
