import bcrypt from 'bcrypt';
import postgres from 'postgres';

import { users } from '@/lib/placeholder-data';
import { User } from '@/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      admin BOOL NOT NULL DEFAULT FALSE,
      image_url bytea
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user: User) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, password, admin)
        VALUES (${user.id}, ${user.name}, ${hashedPassword}, ${user.admin})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
    ]);

    return Response.json({message: 'database seeded!'});
  } catch (error) {
    return Response.json({error}, {status: 500});

  }
}