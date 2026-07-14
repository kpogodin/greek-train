#!/usr/bin/env bash
# Runs on the VM after code has been updated (see .github/workflows/deploy.yml).
# Applies schema migrations but never touches data — the sqlite file lives
# outside this directory (see deploy/README.md) so `git reset --hard` above
# can never delete it.
set -euo pipefail

APP_DIR=/opt/greek-train/app

cd "$APP_DIR/backend"
npm ci
npx prisma migrate deploy
npm run build
sudo systemctl restart greek-train-backend

cd "$APP_DIR/frontend"
npm ci
npm run build

sudo systemctl reload nginx
