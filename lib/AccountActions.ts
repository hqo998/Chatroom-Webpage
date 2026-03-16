'use server'

import type { User } from "@/lib/definitions";
import { signIn,signOut } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });



async function checkDBAlive(): Promise<boolean> {
  try {
    const result = await sql.begin(() => [
      sql`
        SELECT 1;
      `,
    ]);
    return true;
  } catch (error) {
    console.error("Couldn't connect to DB", error);
    return false;
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  if (!(await checkDBAlive())) {
    console.log("Auth DB check failed.");
    return 'Failed to contact server.';
  }

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    // throw error;
  }

  redirect('/chat');
}

export async function logOut() {
  await signOut({ redirectTo: '/' });
}

export async function tryRegister(
  prevState: string | undefined,
  formData: FormData
) {

  const username = formData.get("username")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm_password")?.toString();

  if (password !== confirmPassword) {
    return "passwords don't match!"
  }

  if (!username || !password) {
    return "Missing required fields";
  }

  const allowedCharacters = "abcdefghijklmnopqrstuvwxyz1234567890-_"
  for (const letter of username) {
    if (!allowedCharacters.includes(letter)) return "No special charcters allowed in username.";
  }

  if (username.length > 24) return 'Name too long'
  if (username.length < 3) return 'Name too short.'
  if (password.length < 8) return 'Password too short.'

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql.begin(() => [
      sql`
        INSERT INTO users (id, name, password, admin)
        VALUES (${crypto.randomUUID()}, ${username}, ${hashedPassword}, false)
        ON CONFLICT (id) DO NOTHING;
      `,
    ]);

    // return 'Account registered!';
  } catch (error) {
    console.log(error);
    return 'Something went wrong.';

  }
  await signIn('credentials', {username, password, redirect: false});
  redirect('/chat');

  return "it's raining cats and dogs"
}

