// Test Supabase connection
// Run with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://byoneixyvttadrbckldy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5b25laXh5dnR0YWRyYmNrbGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjUxMTIsImV4cCI6MjA2OTIwMTExMn0.MvQHYupCRNYXiX8Kz3dbLhitj1DosMzAVgq6ek5lrH8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('patients').select('count');
    
    if (error) {
      console.log('❌ Connection test failed:', error.message);
      if (error.message.includes('relation "patients" does not exist')) {
        console.log('📋 Database tables not created yet. Please run the SQL setup first.');
      }
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Database is ready for WRev Healthcare');
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

testConnection();
