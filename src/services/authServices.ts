import { Session, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authReposity from "../repositories/authRepository.js";

export type CreateUserData = Omit<User, "id" | "createdAt">;
export type CreateSessionData = Omit<Session, "id" | "createdAt">;

async function register(body: CreateUserData) {
  const { email, password } = body;

  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await authReposity.findUserByEmail(email);
  if (user) {
    console.log("usuario ja existe");
    throw { type: "conflict" };
  }

  await authReposity.createUser({ email, password: hashedPassword });
}

async function login(user: CreateUserData) {
  const { email, password } = user;
  const config = { expiresIn: 60 * 60 * 6 };

  const userDB = await authReposity.findUserByEmail(email);
  if (!userDB) {
    console.log("usuario nao existe");
    throw { type: "not_found" };
  }
  const { id: userId, password: hashedPassword } = userDB;

  const login = bcrypt.compareSync(password, hashedPassword);
  if (!login) {
    console.log("senhas nao batem");
    throw { type: "conflict" };
  }
  const token = createToken(userId, email);
  return token;
}

export async function createToken(userId: number, email: string) {
  const session = await authReposity.findSessionByUserId(userId);

  if (session.length === 0) {
    await insertSession(userId, email);
    const session = await authReposity.findSessionByUserId(userId);

    return session[session.length - 1].token;
  }
  if (session) {
    const verified = jwt.verify(
      session[session.length - 1].token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          console.log("token expirado, faca login novamente");
          throw { type: "conflict" };
        }
      }
    );
  }

  return session[session.length - 1].token;
}

async function insertSession(userId: number, email: string) {
  const config = { expiresIn: 60 * 60 * 6 };
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, config);
  await authReposity.createSession({ userId, token });
}

export default { register, login, createToken };
