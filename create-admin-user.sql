-- Create Admin User Script for debsmit.gdsc@gmail.com
-- Run this AFTER creating the user in Supabase Auth Dashboard

-- Step 1: First create the user in Supabase Auth Dashboard
-- Go to Authentication > Users > Add User
-- Email: debsmit.gdsc@gmail.com
-- Password: Dg@16112003
-- Email Confirm: true

-- Step 2: Then run this SQL to make them an admin

-- Create the admin user record
INSERT INTO admin_users (id, email, full_name, role, permissions)
SELECT
  id,
  email,
  'Debsmit Ghosh - System Administrator',
  'super_admin',
  ARRAY[
    'view_patients',
    'manage_patients',
    'view_analytics',
    'manage_settings',
    'view_audit_logs',
    'manage_admins'
  ]
FROM auth.users
WHERE email = 'debsmit.gdsc@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions,
  updated_at = NOW();

-- Verify the admin was created
SELECT
  au.email,
  au.full_name,
  au.role,
  au.permissions,
  au.is_active,
  au.created_at
FROM admin_users au
WHERE au.email = 'debsmit.gdsc@gmail.com';

-- Success message
SELECT 'Admin user created successfully! You can now login with debsmit.gdsc@gmail.com' as message;
