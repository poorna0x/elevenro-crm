-- Fix RLS policies for technicians and jobs tables
-- Run this script in your Supabase SQL editor

-- Add missing INSERT and DELETE policies for technicians
CREATE POLICY "Allow authenticated users to insert technicians" ON technicians FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete technicians" ON technicians FOR DELETE USING (auth.role() = 'authenticated');

-- Add missing INSERT and DELETE policies for jobs
CREATE POLICY "Allow authenticated users to insert jobs" ON jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete jobs" ON jobs FOR DELETE USING (auth.role() = 'authenticated');

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('technicians', 'jobs')
ORDER BY tablename, policyname;
