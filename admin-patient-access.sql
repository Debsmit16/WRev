-- Admin Patient Access Policies
-- Run this in Supabase SQL Editor to allow admins to view and edit all patient data

-- Add admin policies for patients table
CREATE POLICY "Admins can view all patients" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can update all patients" ON patients
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
        AND ('manage_patients' = ANY(au.permissions) OR au.role = 'super_admin')
    )
  );

-- Add admin policies for vitals_readings table
CREATE POLICY "Admins can view all vitals" ON vitals_readings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Add admin policies for environmental_data table
CREATE POLICY "Admins can view all environmental data" ON environmental_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Add admin policies for health_alerts table
CREATE POLICY "Admins can view all health alerts" ON health_alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can update health alerts" ON health_alerts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Success message
SELECT 'Admin patient access policies created successfully!' as message;
