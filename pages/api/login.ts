import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, verifyPassword } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  insertUser,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

export type LoginRequest = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginResponse = { errors: Errors } | { user: User };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain username or password' }],
    });
    return;
  }

  // if (!req.body.csrfToken || !verifyCsrfToken(req.body.csrfToken)) {
  //   res.status(400).send({
  //     errors: [{ message: 'Request does not contain valid CSRF token' }],
  //   });
  //   return;
  // }

  try {
    const username = req.body.username;

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      username,
    );

    if (!userWithPasswordHash) {
      res.status(400).send({
        errors: [{ message: 'Username or password does not match' }],
      });
      return;
    }

    const isPasswordVerified = await verifyPassword(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );

    // Password doesn't match hash in the database
    if (!isPasswordVerified) {
      res.status(401).send({
        errors: [{ message: 'Username or password does not match' }],
      });
      return;
    }

    // clean old sessions
    // deleteExpiredSessions();

    // 1. create the token
    const token = crypto.randomBytes(64).toString('base64');
    console.log('userWithPasswordHash', userWithPasswordHash);

    // 2. do a DB query to add the session record
    const newSession = await createSession(token, userWithPasswordHash.id);
    console.log(newSession);

    // set the response to create the cookie in the browser

    const cookie = createSerializedRegisterSessionTokenCookie(
      newSession.sessionsToken,
    );

    // Important! Removing the password
    // hash from the response sent back
    // to the user
    const { passwordHash, ...user } = userWithPasswordHash;

    res.status(200).setHeader('Set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
