import { Card } from "@prisma/client";
import Cryptr from "cryptr";

import cardRepository from "../repositories/cardRepository.js";

export type CreateCardData = Omit<Card, "id" | "createdAt">;

async function create(data: CreateCardData) {
  const cryptr = new Cryptr(process.env.JWT_SECRET);
  // // const decryptedString = cryptr.decrypt(encryptedString);
  const encryptedSecurityCode = cryptr.encrypt(data.securityCode);
  const encryptedPassword = cryptr.encrypt(data.password);
  delete data.securityCode;
  delete data.password;
  data = {
    ...data,
    securityCode: encryptedPassword,
    password: encryptedPassword,
  };
  const isInvalidLabel = await cardRepository.findCardByNameAndUserId(data);
  if (isInvalidLabel) {
    console.log("nome repetido por userId");
    throw { type: "conflict" };
  }

  await cardRepository.create(data);
}

async function getAll(userId: number) {
  const cards = await cardRepository.findCardsByUserId(userId);
  if (cards.length === 0) {
    throw { type: "not_found" };
  }
  return cards;
}

async function get(id: number, userId: number) {
  const cards = await cardRepository.findCardById(id, userId);
  if (!cards) {
    throw { type: "not_found" };
  }
  return cards;
}

async function remove(id: number, userId: number) {
  const cards = await cardRepository.findCardById(id, userId);
  if (!cards) {
    throw { type: "not_found" };
  }
  await cardRepository.removeById(id);
}

export default { create, getAll, get, remove };
