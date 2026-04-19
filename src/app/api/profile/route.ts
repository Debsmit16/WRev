import { NextRequest, NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/lib/server/auth';
import { sql } from '@/lib/server/neon';

type ProfileRow = {
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
};

export async function GET(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const rows = await sql<ProfileRow[]>`
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
        allergies
      FROM patients
      WHERE id = ${auth.user.id}
      LIMIT 1
    `;

    return NextResponse.json({ profile: rows[0] || null });
  } catch {
    return NextResponse.json({ error: 'Failed to load profile from Neon' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();

    await sql`
      INSERT INTO patients (
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
      ) VALUES (
        ${auth.user.id},
        ${auth.user.email || ''},
        ${body.full_name || null},
        ${body.phone || null},
        ${body.date_of_birth || null},
        ${body.gender || null},
        ${body.address || null},
        ${body.emergency_contact_name || null},
        ${body.emergency_contact_phone || null},
        ${body.medical_conditions || []},
        ${body.medications || []},
        ${body.allergies || []},
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO UPDATE
      SET
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
        updated_at = NOW()
    `;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save profile to Neon' }, { status: 500 });
  }
}
