-- Fix jobs table to add missing images column
-- This file adds the images column to the jobs table

-- Add images column to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';

-- Add comment to explain the column
COMMENT ON COLUMN jobs.images IS 'Array of image URLs uploaded by customer during booking';

-- Update the RLS policies to allow anonymous access to the images column
-- (This should already be covered by the previous RLS fix, but just in case)
GRANT INSERT ON jobs TO anon;
GRANT SELECT ON jobs TO anon;
