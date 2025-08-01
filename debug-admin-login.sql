-- Debug Admin Login Issues
-- Run this to temporarily disable RLS and test admin login

-- Step 1: Check if your admin record exists
SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.permissions,
    au.is_active,
    u.email as auth_email
FROM admin_users au
JOIN auth.users u ON u.id = au.id
WHERE au.email = 'debsmit.gdsc@gmail.com';

-- Step 2: Temporarily disable RLS for testing
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Step 3: Test the exact query the app uses
SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.permissions,
    au.is_active
FROM admin_users au
WHERE au.id = (SELECT id FROM auth.users WHERE email = 'debsmit.gdsc@gmail.com')
AND au.is_active = true;

-- Step 4: Re-enable RLS after testing
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 5: Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';

-- Success message
SELECT 'Debug queries completed. Check the results above.' as message;
