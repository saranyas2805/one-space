# OneSpace

OneSpace is a premium all-in-one web app foundation for social discovery, AI assistance, learning, gaming, productivity, careers and communities.

## Tech stack

- Next.js 15 App Router
- React 19 + TypeScript
- Tailwind CSS
- Supabase Auth and Postgres
- Lucide icons

## Run locally

1. Install Node.js 20 or newer.
2. Clone this repository.
3. Install dependencies with `npm install`.
4. Create a Supabase project and copy its Project URL and Publishable key.
5. Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

   The publishable key is designed for browser use. Never put a Supabase secret or service-role key in a `NEXT_PUBLIC_` variable or commit either secret to GitHub.

6. In the Supabase SQL Editor, run the SQL from `supabase/schema.sql`.
7. In Supabase Authentication URL Configuration, add your local callback URL (for example `http://localhost:3000/auth/callback`) and your deployed site's callback URL.
8. Start the development server:

   ```bash
   npm run dev
   ```

9. Open http://localhost:3000.

For a production build, run `npm run build` and then `npm start`.

## Authentication foundation

- Email/password sign-up and sign-in.
- Email confirmation callback and profile creation.
- Server-side cookie session refresh for Next.js 15.
- Protected application routes.
- A private profile table with row-level security (RLS).

## Current implementation status

The first foundation includes the responsive dashboard, module navigation, interactive local demo controls, and the authentication foundation described above.

**Demo / not yet connected:** real AI responses, voice/image AI, social feed persistence, media uploads, real-time messaging, job feeds, multiplayer networking, production game engines, and complete feature-specific database tables. Sample dashboard stats and community content are illustrative only.

## Security

- The browser uses only the Supabase publishable key.
- Never expose a Supabase secret or service-role key to client code.
- User profile rows are protected by RLS policies.
- Keep all real secrets in local environment variables or Vercel environment settings. Never commit real secrets to Git.
