-- Ultra simple technician authentication
-- Only add password and account_status fields

-- Step 1: Add authentication columns
ALTER TABLE technicians 
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS account_status VARCHAR(20) DEFAULT 'ACTIVE';

-- Step 2: Add constraint for account_status
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

-- Step 3: Create simple test technician
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
    'Test Technician',
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

-- Step 4: Check if it worked
SELECT full_name, email, password, account_status 
FROM technicians 
WHERE email = 'technician@roservice.com';
