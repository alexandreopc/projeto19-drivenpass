import { prisma } from "../config/database.js";
import { CreateNoteData } from "../services/noteServices.js";

async function create(data: CreateNoteData) {
  await prisma.note.create({ data });
}

async function findNoteByTilteAndUserId(data: CreateNoteData) {
  const { userId, title } = data;
  return await prisma.note.findFirst({
    where: { userId, title },
  });
}

async function findNotesByUserId(userId: number) {
  return await prisma.note.findMany({
    where: { userId },
  });
}

async function findNoteById(id: number, userId: number) {
  return await prisma.note.findFirst({
    where: { id, userId },
  });
}

async function removeById(id: number) {
  await prisma.note.delete({
    where: { id },
  });
}

export default {
  create,
  findNoteByTilteAndUserId,
  findNotesByUserId,
  findNoteById,
  removeById,
};
