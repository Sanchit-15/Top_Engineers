# Top Engineers API

Backend foundation for the Top Engineers project. The service-role key is read only by this Node.js server; never use it in frontend code or expose it in API responses.

1. Copy `.env.example` to `.env` and enter the project's Supabase URL, anon key, and service-role key.
2. From this directory, run `npm install` and then `npm run dev`.
3. Check `http://localhost:3001/api/health`. The endpoint queries the existing `categories` table and returns only generic server/database status.

The database health check requires a valid `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. No schema or RLS changes are made by this service.
