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
      image_url bytea,
      created_at TIMESTAMPTZ DEFAULT NOW()
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

async function seedMessages() {
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      sender_id UUID REFERENCES users(id) ON DELETE SET NULL,

      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

async function seedParticipants() {
  await sql`
    CREATE TABLE IF NOT EXISTS participants (
      conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      last_read_at TIMESTAMPTZ DEFAULT NOW(),
      joined_at TIMESTAMPTZ DEFAULT NOW(),

      PRIMARY KEY (conversation_id, user_id)
    );
  `;
}

async function seedConversations() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

  await sql`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(60),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedParticipants(),
      seedConversations(),
      seedMessages(),
    ]);

    return Response.json({message: 'database seeded!'});
  } catch (error) {
    return Response.json({error}, {status: 500});

  }
}