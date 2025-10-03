-- Simple fix for technician authentication
-- Run this script in your Supabase SQL editor

-- Step 1: Add missing columns to technicians table
ALTER TABLE technicians 
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS account_status VARCHAR(20) DEFAULT 'ACTIVE';

-- Step 2: Add check constraint for account_status (without IF NOT EXISTS)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'check_account_status'
    ) THEN
        ALTER TABLE technicians 
        ADD CONSTRAINT check_account_status 
        CHECK (account_status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED'));
    END IF;
END $$;

-- Step 3: Update existing technicians to have ACTIVE status
UPDATE technicians 
SET account_status = 'ACTIVE' 
WHERE account_status IS NULL;

-- Step 4: Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'technicians' 
AND column_name IN ('password', 'account_status')
ORDER BY column_name;
