import { prisma } from "../config/database.js";
import { CreateUserData, CreateSessionData } from "../services/authServices.js";

async function createUser(user: CreateUserData) {
  await prisma.user.create({
    data: user,
  });
}

async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({ where: { email } });
}

async function createSession(sessionData: CreateSessionData) {
  return await prisma.session.create({ data: sessionData });
}

async function findSessionByUserId(userId: number) {
  return await prisma.session.findMany({ where: { userId } });
}

async function getUserIdByToken(token: string) {
  return await prisma.session.findFirst({ where: { token } });
}
async function getUserEmailById(id: number) {
  return await prisma.user.findFirst({ where: { id } });
}
export default {
  createUser,
  findUserByEmail,
  createSession,
  findSessionByUserId,
  getUserIdByToken,
  getUserEmailById,
};
