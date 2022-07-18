import { prisma } from "../config/database.js";
import { CreateCardData } from "../services/cardServices.js";

async function create(data: CreateCardData) {
  await prisma.card.create({ data });
}

async function findCardByNameAndUserId(data: CreateCardData) {
  return await prisma.card.findFirst({
    where: { userId: data.userId, label: data.label },
  });
}

async function findCardsByUserId(userId: number) {
  return await prisma.card.findMany({
    where: { userId },
  });
}

async function findCardById(id: number, userId: number) {
  return await prisma.card.findFirst({
    where: { id, userId },
  });
}

async function removeById(id: number) {
  await prisma.card.delete({
    where: { id },
  });
}

export default {
  create,
  findCardByNameAndUserId,
  findCardsByUserId,
  findCardById,
  removeById,
};
