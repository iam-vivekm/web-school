import { spawn } from 'child_process';

process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_6UnZv3ToOiIb@ep-round-pond-ad2jhehr-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const child = spawn('npx', ['drizzle-kit', 'push'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true
});

child.stdin.write('y\n');
child.stdin.write('y\n');
child.stdin.end();
