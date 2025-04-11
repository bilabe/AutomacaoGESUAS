import { request } from '@playwright/test';
import * as fs from 'fs-extra';
import * as path from 'path';

const sessionDir = path.resolve(__dirname, '../../.auth');

export async function getStorageStateFor(user: string, password: string): Promise<string> {
  const sessionFile = path.join(sessionDir, `session-${user}.json`);

  if (fs.existsSync(sessionFile)) {
    return sessionFile;
  }

  const context = await request.newContext();
  const loginPage = await context.get('http://localhost/login');
  const html = await loginPage.text();
  const csrfToken = html.match(/name="_csrf_token" value="(.+?)"/)?.[1];

  if (!csrfToken) {
    throw new Error('CSRF token não encontrado!');
  }

  await context.post('http://localhost/login_check', {
    form: {
      _username: user,
      _password: password,
      _csrf_token: csrfToken,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  await fs.promises.mkdir(sessionDir, { recursive: true });
  await context.storageState({ path: sessionFile });
  await context.dispose();

  return sessionFile;
}
