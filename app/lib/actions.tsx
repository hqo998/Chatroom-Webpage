'use server'

import type { User } from "@/app/lib/definitions";

export type LoginUser = Omit<User, 'id' | 'image_url'>;

export async function tryLogin(formData: FormData)
{
  console.log(formData);
}