import { Network } from "@prisma/client";
import Cryptr from "cryptr";

import networkRepository from "../repositories/networkRepository.js";

export type CreateNetworkData = Omit<Network, "id" | "createdAt">;

async function create(data: CreateNetworkData) {
  const cryptr = new Cryptr(process.env.JWT_SECRET);
  // // const decryptedString = cryptr.decrypt(encryptedString);
  const encryptedPassword = cryptr.encrypt(data.password);
  delete data.password;
  data = {
    ...data,
    password: encryptedPassword,
  };
  const isInvalidLabel = await networkRepository.findNetworkByNameAndUserId(
    data
  );
  if (isInvalidLabel) {
    console.log("label repetido por userId");
    throw { type: "conflict" };
  }
  console.log(data);
  await networkRepository.create(data);
}

async function getAll(userId: number) {
  const cards = await networkRepository.findNetworksByUserId(userId);
  if (cards.length === 0) {
    throw { type: "not_found" };
  }
  return cards;
}

async function get(id: number, userId: number) {
  const cards = await networkRepository.findNetworkById(id, userId);
  if (!cards) {
    throw { type: "not_found" };
  }
  return cards;
}

async function remove(id: number, userId: number) {
  const cards = await networkRepository.findNetworkById(id, userId);
  if (!cards) {
    throw { type: "not_found" };
  }
  await networkRepository.removeById(id);
}

export default { create, getAll, get, remove };
