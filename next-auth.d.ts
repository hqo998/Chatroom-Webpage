import type { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT as DefaultJWT } from 'next-auth/jwt';
import type { User as AppUser } from '@/lib/definitions';

type AuthUserFields = Pick<AppUser, 'id' | 'image_url' | 'admin' | 'created_at'>;

declare module 'next-auth' {
  interface User extends DefaultUser, AuthUserFields {}

  interface Session {
    user: AuthUserFields & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, AuthUserFields {}
}
