import { NextRequest, NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/server/supabaseAdmin';

type ResolvedRole = 'patient' | 'doctor' | 'admin' | 'super_admin' | 'moderator';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!bearerToken) {
      return NextResponse.json({ error: 'Missing access token' }, { status: 401 });
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(bearerToken);

    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 401 });
    }

    const { data: adminRow, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('id, role, is_active')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError) {
      return NextResponse.json({ error: 'Role lookup failed' }, { status: 500 });
    }

    if (adminRow?.is_active) {
      return NextResponse.json({ role: adminRow.role as ResolvedRole });
    }

    const metadataRole = (user.app_metadata?.role || user.user_metadata?.role || '').toString().toLowerCase();

    if (metadataRole === 'doctor') {
      return NextResponse.json({ role: 'doctor' satisfies ResolvedRole });
    }

    return NextResponse.json({ role: 'patient' satisfies ResolvedRole });
  } catch {
    return NextResponse.json({ error: 'Unexpected auth error' }, { status: 500 });
  }
}
