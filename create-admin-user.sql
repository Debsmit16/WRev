-- Create Admin User Script
-- Run this AFTER creating an admin user through Supabase Auth

-- Step 1: First create the user in Supabase Auth Dashboard
-- Go to Authentication > Users > Add User
-- Email: admin@wrev.com
-- Password: (create a secure password)
-- Email Confirm: true

-- Step 2: Then run this SQL to make them an admin
-- Replace 'admin@wrev.com' with the actual admin email

-- Create the admin user record
INSERT INTO admin_users (id, email, full_name, role, permissions)
SELECT 
  id,
  email,
  'System Administrator',
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
WHERE email = 'admin@wrev.com'
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
WHERE au.email = 'admin@wrev.com';

-- Success message
SELECT 'Admin user created successfully! You can now login with admin@wrev.com' as message;
