import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/lib/server/supabaseAdmin';

export async function getAuthenticatedUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!accessToken) {
    return { user: null, error: 'Missing access token', status: 401 as const };
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !user) {
    return { user: null, error: 'Invalid access token', status: 401 as const };
  }

  return { user, error: null, status: 200 as const };
}
