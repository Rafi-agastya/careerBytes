# careerBytes-backend

## Stack
- Express 5 + TypeScript 6 (commonjs, ES2020)
- Drizzle ORM + `pg` Pool (PostgreSQL)
- JWT auth + Passport Google OAuth20
- Zod v4 validation

## Commands
| Command | Action |
|---|---|
| `npm run dev` | Start dev server via nodemon + ts-node |
| `npm run build` | `tsc`, output to `./dist` |
| `npm run seed` | Seed trending_skills table |
| `npm run seed:assessment` | Seed roles + quiz_questions |

No lint, typecheck, or test scripts exist.

## Env (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
CLIENT_URL=http://localhost:5173
```

## Architecture
- **Entrypoint**: `src/app.ts`
- **Flow**: `routes/` → `controllers/` → Drizzle ORM / raw pg queries
- **DB schema**: `src/db/schema.ts` — tables: `users`, `trending_skills`, `roles`, `quiz_questions`, `quiz_results`, `quiz_answers`
- **Mixed DB access**: Auth controllers use raw `pool.query()`, other modules use Drizzle ORM `db` instance
- **Validation**: Zod schemas in `src/validators/`

## API Routes
| Prefix | Auth |
|---|---|
| `/api/auth` | Register, login, Google OAuth, `GET /me` (protected) |
| `/api/trending-skills` | All protected. `GET /periods`, `GET /?year=2025` |
| `/api/skill-assessment` | All protected. `GET /questions?role=...`, `POST /submit`, `GET /result` |

## Key Conventions
- **Auth**: JWT Bearer token, 7d expiry. Protect routes with `protect` middleware from `src/middlewares/authMiddleware.ts`
- **API responses**: Mixed Indonesian/English — keep existing style per endpoint
- **Seed scripts**: Separate scripts for different data. Run after DB is migrated.
- **DB migrations**: Manual SQL in `drizzle/` directory, applied externally (no migrate script in package.json)
- **Drizzle Kit** listed as runtime dependency (not devDep) — use `npx drizzle-kit` for schema push/generate if needed
