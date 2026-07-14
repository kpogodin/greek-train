# Deploying to the VM

Everything under `deploy/` is version-controlled and reused by every deploy.
Everything below is a **one-time manual setup** on a fresh VM — CI never runs
these steps, so redeploys can't accidentally repeat or undo them.

## 0. Placeholders to fill in

| Placeholder | Where | What it is |
|---|---|---|
| `YOUR_DOMAIN_OR_IP` | `deploy/nginx/greek-train.conf` | VM's public IP or domain |
| `VM_HOST` | GitHub repo → Settings → Secrets → Actions | same IP/domain, for SSH |
| `VM_USER` | GitHub secret | the `deploy` system user created below |
| `VM_SSH_KEY` | GitHub secret | private key paired with the pubkey installed on the VM |
| `VM_SSH_PORT` | GitHub secret | usually `22` |

## 1. Base packages on the VM

```bash
sudo apt update
sudo apt install -y nginx git
# Node (adjust version to whatever the repo's engines expect)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2. Deploy user

```bash
sudo adduser --system --group --home /home/deploy --shell /bin/bash deploy
sudo mkdir -p /home/deploy/.ssh
sudo tee /home/deploy/.ssh/authorized_keys < your_deploy_key.pub
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh && sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

The private half of this keypair goes into the `VM_SSH_KEY` GitHub secret.

Let `deploy` restart the service and reload nginx without a password
(`deploy/deploy.sh` calls these via `sudo`):

```bash
echo 'deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart greek-train-backend, /bin/systemctl reload nginx' \
  | sudo tee /etc/sudoers.d/greek-train-deploy
```

## 3. Persistent data directory (survives every deploy)

```bash
sudo mkdir -p /var/lib/greek-train
sudo chown deploy:deploy /var/lib/greek-train
```

This is where the sqlite file lives — **outside** `/opt/greek-train/app`, so
`git reset --hard` during deploy never touches it. See the DB note at the
bottom of this file.

## 4. Clone the app

```bash
sudo mkdir -p /opt/greek-train
sudo chown deploy:deploy /opt/greek-train
sudo -u deploy git clone <YOUR_GITHUB_REPO_URL> /opt/greek-train/app
```

## 5. Backend env (not committed — create by hand)

`/opt/greek-train/app/backend/.env`:

```
DATABASE_URL=file:/var/lib/greek-train/dev.db
PORT=3001
```

(Don't quote the value — some systemd versions pass the quotes through
literally when read via `EnvironmentFile`.)

## 6. Frontend env (not committed — create by hand)

`/opt/greek-train/app/frontend/.env`:

```
VITE_API_URL=/api
```

This makes the built frontend call the same origin under `/api/...`, which
nginx proxies to the backend on `127.0.0.1:3001` (see
`deploy/nginx/greek-train.conf`). No CORS, no hardcoded IP baked into the
frontend bundle.

## 7. First build + migrate + seed (once, by hand)

```bash
cd /opt/greek-train/app/backend
npm ci
npx prisma migrate deploy
npm run import-csv     # seeds the vocabulary from a2_greek_vocabulary.csv
npm run build

cd /opt/greek-train/app/frontend
npm ci
npm run build
```

## 8. systemd service

```bash
sudo cp /opt/greek-train/app/deploy/systemd/greek-train-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now greek-train-backend
```

## 9. nginx

```bash
sudo cp /opt/greek-train/app/deploy/nginx/greek-train.conf /etc/nginx/sites-available/greek-train
# edit YOUR_DOMAIN_OR_IP in that file first
sudo ln -s /etc/nginx/sites-available/greek-train /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 10. GitHub secrets

Repo → Settings → Secrets and variables → Actions, add `VM_HOST`, `VM_USER`,
`VM_SSH_KEY`, `VM_SSH_PORT` from the table above.

From here on, every push to `main` triggers
`.github/workflows/deploy.yml`, which SSHes in, pulls the new code, and runs
`deploy/deploy.sh`.

## About the database

The sqlite file at `/var/lib/greek-train/dev.db` is the entire database.
It is created once in step 7 and never touched by CI again — deploys only
run `prisma migrate deploy` (schema changes only, no data loss) and restart
the backend process. Back it up with a simple cron `cp`/`scp` of that one
file; no separate DB server needed at this scale. If concurrent multi-writer
load ever becomes a problem, swap `provider = "sqlite"` for
`"postgresql"` in `backend/prisma/schema.prisma` and point `DATABASE_URL` at
a Postgres instance — everything else in this doc stays the same.

TLS (HTTPS) isn't set up here since we're starting from a bare IP. Once
there's a real domain pointed at the VM, `sudo certbot --nginx -d
YOUR_DOMAIN` (via the `certbot` snap) will handle it in one command.
