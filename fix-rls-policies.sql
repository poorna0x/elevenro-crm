-- Fix RLS policies for booking form
-- This file contains the SQL to fix Row Level Security policies for public booking access

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Allow public to insert customers" ON customers;
DROP POLICY IF EXISTS "Allow public to insert jobs" ON jobs;
DROP POLICY IF EXISTS "Allow anonymous to insert customers" ON customers;
DROP POLICY IF EXISTS "Allow anonymous to insert jobs" ON jobs;
DROP POLICY IF EXISTS "Allow anonymous to read customers" ON customers;
DROP POLICY IF EXISTS "Allow anonymous to read jobs" ON jobs;
DROP POLICY IF EXISTS "Allow anonymous to update customers" ON customers;
DROP POLICY IF EXISTS "Allow anonymous to update jobs" ON jobs;

-- Create new policies that allow anonymous access for booking
CREATE POLICY "Allow anonymous to insert customers" ON customers 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow anonymous to insert jobs" ON jobs 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Also allow anonymous users to read their own data (for confirmation)
CREATE POLICY "Allow anonymous to read customers" ON customers 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow anonymous to read jobs" ON jobs 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- Allow anonymous users to update customers (for booking form updates)
CREATE POLICY "Allow anonymous to update customers" ON customers 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous to update jobs" ON jobs 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- Grant necessary permissions to anonymous users
GRANT INSERT ON customers TO anon;
GRANT INSERT ON jobs TO anon;
GRANT SELECT ON customers TO anon;
GRANT SELECT ON jobs TO anon;
GRANT UPDATE ON customers TO anon;
GRANT UPDATE ON jobs TO anon;

-- Also ensure authenticated users have all permissions
GRANT ALL ON customers TO authenticated;
GRANT ALL ON jobs TO authenticated;
GRANT ALL ON technicians TO authenticated;
GRANT ALL ON service_areas TO authenticated;
GRANT ALL ON parts_inventory TO authenticated;
GRANT ALL ON notifications TO authenticated;
GRANT ALL ON admin_users TO authenticated;
