# Neon Migration (Phase 1)

This project now uses a hybrid approach:
- **Auth**: Supabase Auth (unchanged)
- **App data**: Neon Postgres via server API routes

## Required Environment Variables

Keep existing Supabase variables for auth:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Add Neon database connection:
- `DATABASE_URL`

Example:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
```

## New Neon-backed Endpoints

- `GET /api/admin/patients`
- `PATCH /api/admin/patients/:id`
- `GET /api/profile`
- `PUT /api/profile`

All endpoints require `Authorization: Bearer <supabase_access_token>`.

## Migration Notes

1. Provision matching tables in Neon:
   - `patients`
   - `vitals_readings`
   - `environmental_data`
   - `health_alerts`
   - `admin_users` (if moving role resolution too)

2. Import data from Supabase Postgres into Neon.

3. Current UI modules moved to Neon data APIs:
   - Admin dashboard patient list/update
   - Profile form load/save

4. Remaining Supabase-table consumers can be moved in the same pattern.
