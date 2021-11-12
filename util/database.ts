import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type User = {
  id: number;
  username: string;
  name: string | null;
  email: string | null;
};

export type Workout = {
  id: number;
  title: string;
  description: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
  expiryTimestamp: Date;
};

dotenvSafe.config();

// Type needed for the connection function below
declare module globalThis {
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOneTimeToDatabase() {
  let sql;
  // Heroku setup
  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // In development, connect only once to database !
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id, name, username, email
    FROM
      users;
  `;
  return users.map((user) => {
    return camelcaseKeys(user);
  });
}

export async function getUser(id: number) {
  const [user] = await sql<[User]>`
    SELECT
      id, name, username, email
    FROM
      users
    WHERE
      id = ${id};
  `;

  return camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username};
  `;
  return user && camelcaseKeys(user);
}

export async function createUser({
  name,
  username,
  email,
}: {
  name: string;
  username: string;
  email: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (name, username, email)
    VALUES
      (${name}, ${username}, ${email})
    RETURNING
      id,
      name,
      username,
      email;
  `;
  return user && camelcaseKeys(user);
}

export async function insertUser({
  name,
  username,
  email,
  passwordHash,
}: {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (name, username, email, password_hash)
    VALUES
      (${name}, ${username}, ${email}, ${passwordHash})
    RETURNING
      id,
      username,
      name,
      email
  `;
  return user && camelcaseKeys(user);
}

export async function updateUserById(
  id: number,
  {
    name,
    username,
    email,
  }: {
    name: string;
    username: string;
    email: string;
  },
) {
  const [user] = await sql<[User | undefined]>`
    UPDATE
      users
    SET
      name = ${name},
      username = ${username},
      email = ${email}
    WHERE
      id = ${id}
    RETURNING
      id,
      name,
      username,
      email;
  `;
  return user && camelcaseKeys(user);
}

export async function deleteUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      id,
      username,
      email;
  `;
  return user && camelcaseKeys(user);
}

export async function getWorkoutsByUserId(userId: number) {
  const workouts = await sql<Workout[]>`
    SELECT
      workouts.id,
      workouts.title,
      workouts.description
    FROM
      users,
      users_workouts,
      workouts
    WHERE
      users.id = ${userId} AND
      users_workouts.user_id = users.id AND
      users_workouts.workout_id = workouts.id;
  `;
  return workouts.map((workout) => camelcaseKeys(workout));
}

// export async function getUserBySessionToken(sessionToken: string | undefined) {
//   if (!sessionToken) return undefined;

//   const [user] = await sql<[User | undefined]>`
//     SELECT
//       users.id,
//       users.email,
//       users.username
//     FROM
//       sessions,
//       users
//     WHERE
//       sessions.token = ${sessionToken} AND
//       sessions.user_id = users.id
//   `;
//   return user && camelcaseKeys(user);
// }

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      sessions_token = ${token} AND
      expiry_timestamp > NOW()
  `;

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (sessions_token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;

  return camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING
      *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      sessions_token = ${token}
    RETURNING
      *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}
