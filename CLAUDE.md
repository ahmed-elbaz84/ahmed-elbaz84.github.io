# مصروفات البيت (personal household expenses app)

The owner is not a developer. Reply in Egyptian Arabic, in plain language.
This is the owner's **personal** project. It has nothing to do with Consultancy Group work: never put it on the company site or the company's Firebase.

Read `HANDOVER.md` first. It has the full status, the data model, the sync and encryption design, and what is left to do.

## Essentials
- Single file app: `index.html` (+ `manifest.webmanifest`, `sw.js`, icons, `qr.png`). There is no build step.
- Live at https://ahmed-elbaz84.github.io via GitHub Pages from `main`. The owner expects every change to be committed and pushed to `main`.
- Bump `CACHE` in `sw.js` on every change so phones pick up the new version.
- Never change the localStorage key `masrofat_elbeit_app_v1` or the data shape without a migration. Real user data lives there.
- Sync is off until `FB_CONFIG` is filled in with the owner's own Firebase project. Synced data is encrypted on the device with a key derived from each user's password, so the owner cannot read other users' data. Keep it that way.
- Test over http://localhost with Playwright at phone size. Don't create accounts on the real Firebase while testing.

## Other app in this repo
- `superclean/` is a separate app (Super Clean, the owner's wife's cleaning-products shop). Read `superclean/HANDOVER.md` before touching it, and bump `CACHE` in `superclean/sw.js` on every change there.
