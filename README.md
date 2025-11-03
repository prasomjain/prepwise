# PrepWise

AI-powered mock interview platform that generates role- and tech-stack-specific interview questions (via Google Gemini), conducts voice-driven interviews (Vapi), and stores structured AI feedback in Firestore.

## Table of contents
- Project overview
- Features
- Tech stack
- Quick local setup
- Environment variables
- Run & test locally
- Key endpoints
- Challenges & resolutions
- Future goals
- Contributing

---

## Project overview
PrepWise lets users create interview templates, run voice interviews, and receive structured feedback. The repo contains a Next.js (App Router) frontend, server actions, API routes, and Firebase integration (client + Admin).

## Features
- Generate interview questions by role/level/tech-stack.
- Voice interviews (Vapi) with transcript capture.
- Structured AI feedback (JSON + human summary) stored in Firestore.
- Authentication with server-set session cookies and logout.

## Tech stack
- Next.js (App Router) + TypeScript  
- Firebase (Client SDK + Admin SDK)  
- Google Gemini (`@ai-sdk/google`)  
- Vapi (voice workflows)  
- Node / npm

## Quick local setup
Prereqs: Node.js 18+, npm, Firebase project & service account.

1. Clone or open project root:
   F:\my projects\ai_mock_interviews-main

2. Ignore local secrets:
```bash
echo ".env.local" >> .gitignore
```

3. Install deps:
```bash
npm install
```

4. Create `.env.local` (see next section).

## Environment variables (.env.local)
Create `.env.local` (DO NOT commit). Example keys:
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\\n-----END PRIVATE KEY-----\n"

NEXT_PUBLIC_VAPI_WEB_TOKEN=...
NEXT_PUBLIC_VAPI_WORKFLOW_ID=...
```
Note: store private key as one line with `\n` escapes; server converts `\\n` → `\n`.

## Run & test locally
Start dev server:
```bash
npm run dev
```
Open http://localhost:3000

Test Firebase admin connectivity:
- GET `http://localhost:3000/api/test-firebase` — writes & reads a test interview.

Watch server logs for debug markers added to flows:
- Received interview request, Generating questions, Parsing generated questions, Saving interview, Successfully saved interview.

## Key endpoints
- POST `/api/vapi/generate` — body: `{ type, role, level, techstack, amount, userid }` → generates questions and saves interview.
- POST `/api/auth/signout` — clears session cookie.
- GET `/api/test-firebase` — admin write test.

## Challenges & resolutions
- Admin SDK init failure (malformed private key): resolved by requiring `FIREBASE_PRIVATE_KEY` as single-line with `\n` escapes and using `.replace(/\\n/g, "\n")`.
- Firestore `.where()` crashes when `userId` undefined: resolved by adding guards in server actions and client checks to wait for auth.
- AI returned non-JSON output (parse errors): resolved by forcing model prompt to return JSON-only arrays and adding try/catch + sanitized parsing.
- Vapi client compatibility issues: resolved by upgrading voice SDK and adding guarded runtime checks.
- Session inconsistencies: centralized session cookie logic and added server signout endpoint with client LogoutButton.

## Future goals
- Role-based templates, resume-linked personalization, multi-step sessions, richer rubrics, analytics dashboard, exportable reports, CI/tests, multi-language voice support.

## Contributing
- Keep secrets out of repo. Use feature branches, small PRs, and include tests for server actions where possible.

