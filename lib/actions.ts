'use server'

import type { User } from "@/lib/definitions";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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

export async function tryRegister(formData: FormData)
{
  console.log(formData);
}

