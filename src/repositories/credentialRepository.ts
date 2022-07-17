import { prisma } from "../config/database.js";
import { CreateCredentialData } from "../services/credentialServices.js";

async function create(data: CreateCredentialData) {
  await prisma.credential.create({ data });
}

async function findCredentialsByNameAndUserId(data: CreateCredentialData) {
  return await prisma.credential.findFirst({
    where: { userId: data.userId, label: data.label },
  });
}

async function findCredentialsByUserId(userId: number) {
  return await prisma.credential.findMany({
    where: { userId },
  });
}

async function findCredentialById(id: number, userId: number) {
  return await prisma.credential.findFirst({
    where: { id, userId },
  });
}

async function removeById(id: number) {
  await prisma.credential.delete({
    where: { id },
  });
}

export default {
  create,
  findCredentialsByNameAndUserId,
  findCredentialsByUserId,
  findCredentialById,
  removeById,
};
