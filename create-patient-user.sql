-- Create Patient User Script for WRev
-- Run this AFTER creating the user in Supabase Auth Dashboard

-- Step 1: First create the user in Supabase Auth Dashboard
-- Go to Authentication > Users > Add User
-- Email: patient.demo@wrev.health
-- Password: WRevPatient@123
-- Email Confirm: true

-- Step 2: Then run this SQL to create the patient profile record

INSERT INTO patients (id, email, full_name, phone, date_of_birth, gender, address, emergency_contact_name, emergency_contact_phone, medical_conditions, medications, allergies)
SELECT
  id,
  email,
  'Demo Patient',
  '+91-90000-00000',
  '1990-01-01',
  'other',
  'Demo Address, Kolkata, India',
  'Demo Care Contact',
  '+91-91111-11111',
  ARRAY['COPD'],
  ARRAY['Inhaler'],
  ARRAY['None']
FROM auth.users
WHERE email = 'patient.demo@wrev.health'
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  date_of_birth = EXCLUDED.date_of_birth,
  gender = EXCLUDED.gender,
  address = EXCLUDED.address,
  emergency_contact_name = EXCLUDED.emergency_contact_name,
  emergency_contact_phone = EXCLUDED.emergency_contact_phone,
  medical_conditions = EXCLUDED.medical_conditions,
  medications = EXCLUDED.medications,
  allergies = EXCLUDED.allergies,
  updated_at = NOW();

-- Verify the patient was created
SELECT
  p.email,
  p.full_name,
  p.phone,
  p.date_of_birth,
  p.gender,
  p.created_at,
  p.updated_at
FROM patients p
WHERE p.email = 'patient.demo@wrev.health';

-- Success message
SELECT 'Patient user created successfully! You can now login with patient.demo@wrev.health' as message;
