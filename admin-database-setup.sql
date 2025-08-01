-- WRev Admin System Database Setup
-- Run this in your Supabase SQL Editor AFTER the main database setup

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('super_admin', 'admin', 'moderator')) DEFAULT 'admin',
  permissions TEXT[] DEFAULT ARRAY['view_patients', 'view_analytics'],
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_sessions table for tracking admin logins
CREATE TABLE admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id),
  login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logout_time TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create system_settings table for admin configuration
CREATE TABLE system_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  description TEXT,
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_audit_log for tracking admin actions
CREATE TABLE admin_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Admin RLS Policies
CREATE POLICY "Admins can view all admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can update own profile" ON admin_users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Super admins can manage all admin users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'super_admin' AND au.is_active = true
    )
  );

-- Admin sessions policies
CREATE POLICY "Admins can view own sessions" ON admin_sessions
  FOR SELECT USING (admin_id = auth.uid());

CREATE POLICY "Admins can insert own sessions" ON admin_sessions
  FOR INSERT WITH CHECK (admin_id = auth.uid());

-- System settings policies
CREATE POLICY "Admins can view system settings" ON system_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can update system settings" ON system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
        AND ('manage_settings' = ANY(au.permissions) OR au.role = 'super_admin')
    )
  );

-- Audit log policies
CREATE POLICY "Admins can view audit logs" ON admin_audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
        AND ('view_audit_logs' = ANY(au.permissions) OR au.role = 'super_admin')
    )
  );

CREATE POLICY "System can insert audit logs" ON admin_audit_log
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX idx_admin_sessions_active ON admin_sessions(is_active);
CREATE INDEX idx_system_settings_key ON system_settings(setting_key);
CREATE INDEX idx_audit_log_admin_id ON admin_audit_log(admin_id);
CREATE INDEX idx_audit_log_created_at ON admin_audit_log(created_at DESC);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('app_name', '"WRev Healthcare"', 'Application name'),
('max_patients_per_admin', '1000', 'Maximum patients an admin can manage'),
('session_timeout_minutes', '480', 'Admin session timeout in minutes'),
('enable_patient_registration', 'true', 'Allow new patient registrations'),
('maintenance_mode', 'false', 'Enable maintenance mode');

-- Create a function to create the first super admin
CREATE OR REPLACE FUNCTION create_super_admin(
  admin_email TEXT,
  admin_name TEXT
) RETURNS UUID AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- This function should be called after creating the admin user in auth.users
  -- Get the user ID from auth.users
  SELECT id INTO admin_id FROM auth.users WHERE email = admin_email;
  
  IF admin_id IS NULL THEN
    RAISE EXCEPTION 'Admin user not found in auth.users with email: %', admin_email;
  END IF;
  
  -- Insert into admin_users
  INSERT INTO admin_users (id, email, full_name, role, permissions)
  VALUES (
    admin_id,
    admin_email,
    admin_name,
    'super_admin',
    ARRAY['view_patients', 'manage_patients', 'view_analytics', 'manage_settings', 'view_audit_logs', 'manage_admins']
  );
  
  RETURN admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Success message
SELECT 'WRev Admin system database setup completed successfully!' as message;
