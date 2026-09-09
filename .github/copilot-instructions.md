# dialogmote-frontend

```sh
pnpm dev
pnpm test --run
pnpm lint
pnpm build
```

`mise run verify` runs fixing commands and can change files.

- The base path is `/syk/dialogmoter`. Pages require `.page.tsx`, `.page.ts`
  or `.page.js`; API routes require `.api.ts` (`next.config.mjs`). Ordinary
  `.tsx` files under pages are not routes.
- Employer routes receive a `narmestelederid`, not a fødselsnummer. Resolve
  the employee and organisation through `fetchSykmeldtAG` before fetching
  their meeting data; keep this distinct from the employee's own flow.
- Use the existing `src/server/tokenXFetch/` wrappers: they select the target
  audience, validate responses and map runtime errors. Backend URLs can
  contain fødselsnummer; retain the allowlisted runtime-error fields instead
  of logging URLs or raw exceptions.
