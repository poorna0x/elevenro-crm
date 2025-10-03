-- Add sample technicians for testing
-- Run this AFTER running add-technician-auth-fields.sql

-- Sample technician 1
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
    '{"serviceTypes": ["RO", "SOFTENER", "AC", "APPLIANCE"], "certifications": [], "experience": 2, "rating": 4.5}',
    '{"pincodes": ["560001", "560002", "560003"], "cities": ["Bangalore"], "maxDistance": 15}',
    '{"workingDays": ["MON", "TUE", "WED", "THU", "FRI"], "startTime": "09:00", "endTime": "18:00", "breakTime": {"start": "13:00", "end": "14:00"}}',
    '{"totalJobs": 0, "completedJobs": 0, "averageRating": 0, "onTimePercentage": 0, "customerSatisfaction": 0}',
    '{"baseSalary": 25000, "commissionPerJob": 500, "commissionPercentage": 5}'
) ON CONFLICT (employee_id) DO NOTHING;

-- Sample technician 2
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
    '{"serviceTypes": ["RO", "AC"], "certifications": ["RO_CERTIFIED"], "experience": 3, "rating": 4.8}',
    '{"pincodes": ["560004", "560005", "560006"], "cities": ["Bangalore"], "maxDistance": 20}',
    '{"workingDays": ["MON", "TUE", "WED", "THU", "FRI", "SAT"], "startTime": "08:00", "endTime": "17:00", "breakTime": {"start": "12:00", "end": "13:00"}}',
    '{"totalJobs": 0, "completedJobs": 0, "averageRating": 0, "onTimePercentage": 0, "customerSatisfaction": 0}',
    '{"baseSalary": 30000, "commissionPerJob": 750, "commissionPercentage": 7}'
) ON CONFLICT (employee_id) DO NOTHING;

-- Verify technicians were created
SELECT 
    id, 
    full_name, 
    email, 
    employee_id,
    account_status,
    CASE WHEN password IS NOT NULL THEN 'Password Set' ELSE 'No Password' END as password_status
FROM technicians 
WHERE email IN ('technician@roservice.com', 'sarah@roservice.com')
ORDER BY created_at DESC;
