-- Minimal technician authentication setup
-- Only essential fields: name, email, password, status

-- Step 1: Add missing columns to technicians table
ALTER TABLE technicians 
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS account_status VARCHAR(20) DEFAULT 'ACTIVE';

-- Step 2: Add check constraint for account_status
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

-- Step 4: Add minimal sample technicians (only required fields)
INSERT INTO technicians (
    full_name,
    phone,
    email,
    employee_id,
    password,
    account_status,
    skills,
    service_areas,
    work_schedule,
    performance,
    salary
) VALUES (
    'John Technician',
    '+91-9876543210',
    'technician@roservice.com',
    'TECH001',
    'technician123',
    'ACTIVE',
    '{}',
    '{}',
    '{}',
    '{}',
    '{}'
) ON CONFLICT (employee_id) DO NOTHING;

-- Add another sample technician
INSERT INTO technicians (
    full_name,
    phone,
    email,
    employee_id,
    password,
    account_status,
    skills,
    service_areas,
    work_schedule,
    performance,
    salary
) VALUES (
    'Sarah Engineer',
    '+91-9876543211',
    'sarah@roservice.com',
    'TECH002',
    'tech123',
    'ACTIVE',
    '{}',
    '{}',
    '{}',
    '{}',
    '{}'
) ON CONFLICT (employee_id) DO NOTHING;

-- Step 5: Verify technicians were created
SELECT 
    full_name, 
    email, 
    employee_id,
    account_status,
    CASE WHEN password IS NOT NULL THEN 'Password Set' ELSE 'No Password' END as password_status
FROM technicians 
WHERE email IN ('technician@roservice.com', 'sarah@roservice.com')
ORDER BY created_at DESC;
