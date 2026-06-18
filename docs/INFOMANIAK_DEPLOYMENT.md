# Infomaniak Deployment

## Target

- Hosting ID: `681272`
- Runtime: Node.js 24
- Staging domain: `staging.brueckenbauer-gmbh.ch`
- Production domains: `brueckenbauer-gmbh.ch`, `www.brueckenbauer-gmbh.ch`
- Keep the existing Site Creator site available until the production cutover is verified.

## Node.js Site Configuration

- Creation method: Custom project imported with Git
- Execution directory: `./`
- Build command: `HUSKY=0 npm ci --include=dev --no-audit --no-fund && npm run build:infomaniak`
- Launch command: `npm run start:infomaniak`
- Listening port: use the dynamic `PORT` value supplied by Infomaniak; do not hardcode it.

## Environment Variables

Configure these in the Node.js site settings. Never commit their values.

```text
NODE_ENV=production
DEPLOY_TARGET=infomaniak
NEXT_PUBLIC_SITE_URL=https://staging.brueckenbauer-gmbh.ch
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<public site key>
TURNSTILE_SECRET_KEY=<secret key>
RESEND_API_KEY=<secret key>
RESEND_FROM_EMAIL=<verified sender>
RESEND_TO_EMAIL=<recipient list>
```

For production, change `NEXT_PUBLIC_SITE_URL` to `https://brueckenbauer-gmbh.ch`. Enable the Google Analytics measurement ID only for the production domain unless staging traffic should be recorded.

The staging and production hostnames must be allowed by the Cloudflare Turnstile widget configuration before form testing.

## Staging Validation

1. Confirm `/api/health` returns HTTP 200.
2. Verify the EN, DE, and FR home, product, industry, About, Contact, and RFQ routes.
3. Confirm HTTPS and canonical URLs use the staging domain.
4. Submit one Contact and one RFQ test after explicit approval and confirm Resend delivery.
5. Confirm missing or invalid Turnstile tokens return HTTP 403.
6. Check Manager runtime logs for startup, memory, and delivery errors.

## Production Cutover

1. Preserve the Site Creator site and its current domain mapping.
2. Add the apex and `www` domains to the verified Node.js site.
3. Issue or attach SSL certificates for both hostnames.
4. Make the apex domain canonical and redirect `www` to the apex domain.
5. Rebuild with the production `NEXT_PUBLIC_SITE_URL` and analytics ID.
6. Repeat health, route, form, mobile, and locale smoke tests.
7. Keep the previous Site Creator setup for rollback until the new site has been stable for at least 72 hours.

## Rollback

If the Node.js site fails after cutover, reassign the apex and `www` domains to the preserved Site Creator site. Do not delete the previous site before the rollback window closes.
