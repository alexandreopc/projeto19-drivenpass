import { prisma } from "../config/database.js";
import { CreateNetworkData } from "../services/networkServices.js";

async function create(data: CreateNetworkData) {
  await prisma.network.create({ data });
}

async function findNetworkByNameAndUserId(data: CreateNetworkData) {
  return await prisma.network.findFirst({
    where: { userId: data.userId, label: data.label },
  });
}

async function findNetworksByUserId(userId: number) {
  return await prisma.network.findMany({
    where: { userId },
  });
}

async function findNetworkById(id: number, userId: number) {
  return await prisma.network.findFirst({
    where: { id, userId },
  });
}

async function removeById(id: number) {
  await prisma.network.delete({
    where: { id },
  });
}

export default {
  create,
  findNetworkByNameAndUserId,
  findNetworksByUserId,
  findNetworkById,
  removeById,
};
