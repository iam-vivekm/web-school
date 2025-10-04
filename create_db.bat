@echo off
cd /d "%~dp0"
set DATABASE_URL=postgresql://neondb_owner:npg_6UnZv3ToOiIb@ep-round-pond-ad2jhehr-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
echo y | npx drizzle-kit push
