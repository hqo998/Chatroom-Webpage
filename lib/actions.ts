'use server'

import type { User } from "@/lib/definitions";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type LoginUser = Omit<User, 'id' | 'image_url'>;


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
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
    throw error;
  }
}

export async function tryRegister(
  prevState: string | undefined,
  formData: FormData
) {

  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm_password")?.toString();

  if (password !== confirmPassword) {
    return "passwords don't match!"
  }

  if (!username || !password) {
    return "Missing required fields";
  }

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

