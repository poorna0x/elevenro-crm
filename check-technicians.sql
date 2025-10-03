-- Check if technicians exist and have the right data
SELECT 
    id, 
    full_name, 
    email, 
    employee_id,
    account_status,
    CASE WHEN password IS NOT NULL THEN 'Password Set' ELSE 'No Password' END as password_status,
    created_at
FROM technicians 
ORDER BY created_at DESC;

-- Check if the password and account_status columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'technicians' 
AND column_name IN ('password', 'account_status');
