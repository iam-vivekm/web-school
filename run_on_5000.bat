@echo off
cd /d "%~dp0"
set PORT=5000
set DATABASE_URL=postgresql://neondb_owner:npg_6UnZv3ToOiIb@ep-round-pond-ad2jhehr-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
set NODE_ENV=development
npx tsx server/index.ts
