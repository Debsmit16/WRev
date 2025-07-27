-- WRev Healthcare Database Setup (Fixed Version)
-- Run this in your Supabase SQL Editor

-- Create patients table
CREATE TABLE patients (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_conditions TEXT[],
  medications TEXT[],
  allergies TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vitals_readings table (for future IoT data)
CREATE TABLE vitals_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES auth.users(id),
  spo2 DECIMAL(5,2),
  heart_rate INTEGER,
  respiratory_rate INTEGER,
  temperature DECIMAL(4,1),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create environmental_data table (for future IoT data)
CREATE TABLE environmental_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES auth.users(id),
  pm25 DECIMAL(6,2),
  co2 INTEGER,
  humidity DECIMAL(5,2),
  temperature DECIMAL(4,1),
  aqi INTEGER,
  location TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_alerts table (for future alerts)
CREATE TABLE health_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES auth.users(id),
  type TEXT CHECK (type IN ('critical', 'warning', 'info')),
  message TEXT NOT NULL,
  description TEXT,
  vitals_reading_id UUID REFERENCES vitals_readings(id),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on our custom tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_alerts ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies
-- Patients can only access their own data

-- Patients table policies
CREATE POLICY "Users can view own profile" ON patients
  FOR ALL USING (auth.uid() = id);

-- Vitals readings policies
CREATE POLICY "Users can view own vitals" ON vitals_readings
  FOR ALL USING (auth.uid() = patient_id);

-- Environmental data policies
CREATE POLICY "Users can view own environmental data" ON environmental_data
  FOR ALL USING (auth.uid() = patient_id);

-- Health alerts policies
CREATE POLICY "Users can view own alerts" ON health_alerts
  FOR ALL USING (auth.uid() = patient_id);

-- Create indexes for better performance
CREATE INDEX idx_vitals_patient_timestamp ON vitals_readings(patient_id, timestamp DESC);
CREATE INDEX idx_environmental_patient_timestamp ON environmental_data(patient_id, timestamp DESC);
CREATE INDEX idx_alerts_patient_created ON health_alerts(patient_id, created_at DESC);

-- Success message
SELECT 'WRev Healthcare database setup completed successfully!' as message;
