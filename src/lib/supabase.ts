import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Patient {
  id: string
  email: string
  full_name: string
  phone: string
  date_of_birth: string
  gender: 'male' | 'female' | 'other'
  address: string
  emergency_contact_name: string
  emergency_contact_phone: string
  medical_conditions: string[]
  medications: string[]
  allergies: string[]
  created_at: string
  updated_at: string
}

export interface VitalsReading {
  id: string
  patient_id: string
  spo2: number
  heart_rate: number
  respiratory_rate: number
  temperature: number
  timestamp: string
  device_id?: string
}

export interface EnvironmentalData {
  id: string
  patient_id: string
  pm25: number
  co2: number
  humidity: number
  temperature: number
  aqi: number
  location: string
  timestamp: string
}

export interface HealthAlert {
  id: string
  patient_id: string
  type: 'critical' | 'warning' | 'info'
  message: string
  description: string
  vitals_reading_id?: string
  is_read: boolean
  created_at: string
}
