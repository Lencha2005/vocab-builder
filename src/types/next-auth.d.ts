/// <reference types="next-auth" />

import { AppUser } from './user';

declare module 'next-auth' {
  interface Session {
    user: AppUser;
  }
}
