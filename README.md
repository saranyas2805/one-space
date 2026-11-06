# OneSpace

OneSpace is a premium all-in-one web app foundation for social discovery, AI assistance, learning, gaming, productivity, careers and communities.

## Tech stack

- Next.js 15 App Router
- React 19 + TypeScript
- Tailwind CSS
- Lucide icons

## Run locally

1. Install Node.js 20 or newer.
2. Clone this repository.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000.

To create a production build:

```bash
npm run build
npm start
```

## Current implementation status

The first foundation commit includes a responsive premium dashboard, desktop sidebar, mobile bottom navigation, module navigation, search filtering, theme toggle control, interactive daily mission checklist, a local task-list demo, a local AI chat input demo, social post composer draft, and six game module entry cards.

**Demo / not yet connected:** user accounts, database persistence, real AI responses, voice/image AI, uploads, real-time messaging, job feeds, multiplayer networking, and production game engines. Sample dashboard stats, stories and community content are illustrative only. No external API keys are included or exposed.

## Next implementation phases

1. Authentication, database schema and user-owned data.
2. Secure server-side AI integration and chat history.
3. Social posts, media storage, follows, comments and messaging.
4. Learning content, quizzes, flashcards and progress.
5. Playable game engines, XP, achievements and leaderboards.
6. Productivity persistence, calendar and reminders.
7. Verified career data integrations and community moderation.

## Security

Keep secrets in server-side environment variables. Never add API keys to client components or commit real secrets to Git.
