import { NextRequest, NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/lib/server/auth';
import { sql } from '@/lib/server/neon';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthenticatedUser(request);
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await params;

  try {
    const body = await request.json();

    await sql`
      UPDATE patients
      SET
        full_name = ${body.full_name || null},
        phone = ${body.phone || null},
        date_of_birth = ${body.date_of_birth || null},
        gender = ${body.gender || null},
        address = ${body.address || null},
        emergency_contact_name = ${body.emergency_contact_name || null},
        emergency_contact_phone = ${body.emergency_contact_phone || null},
        medical_conditions = ${body.medical_conditions || []},
        medications = ${body.medications || []},
        allergies = ${body.allergies || []},
        updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update patient in Neon' }, { status: 500 });
  }
}
