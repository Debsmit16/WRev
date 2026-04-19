import { NextRequest, NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/lib/server/auth';
import { sql } from '@/lib/server/neon';

type PatientRow = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  address: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  medical_conditions: string[] | null;
  medications: string[] | null;
  allergies: string[] | null;
  created_at: string;
  updated_at: string;
};

export async function GET(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const patients = await sql<PatientRow[]>`
      SELECT
        id,
        email,
        full_name,
        phone,
        date_of_birth,
        gender,
        address,
        emergency_contact_name,
        emergency_contact_phone,
        medical_conditions,
        medications,
        allergies,
        created_at,
        updated_at
      FROM patients
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ patients });
  } catch {
    return NextResponse.json({ error: 'Failed to load patients from Neon' }, { status: 500 });
  }
}
