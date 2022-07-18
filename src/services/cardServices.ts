import { Card } from "@prisma/client";
import Cryptr from "cryptr";

import cardRepository from "../repositories/cardRepository.js";

export type CreateCardData = Omit<Card, "id" | "createdAt">;

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function create(data: CreateCardData) {
  const encryptedSecurityCode = cryptr.encrypt(data.securityCode);
  const encryptedPassword = cryptr.encrypt(data.password);
  delete data.securityCode;
  delete data.password;
  data = {
    ...data,
    securityCode: encryptedSecurityCode,
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

  const decryptedCards = cards.map((card) => {
    const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
    const decryptedPassword = cryptr.decrypt(card.password);
    return {
      ...card,
      securityCode: decryptedSecurityCode,
      password: decryptedPassword,
    };
  });
  return decryptedCards;
}

async function get(id: number, userId: number) {
  const cards = await cardRepository.findCardById(id, userId);
  if (!cards) {
    throw { type: "not_found" };
  }

  const decryptedSecurityCode = cryptr.decrypt(cards.securityCode);
  const decryptedPassword = cryptr.decrypt(cards.password);
  return {
    ...cards,
    securityCode: decryptedSecurityCode,
    password: decryptedPassword,
  };
}

async function remove(id: number, userId: number) {
  const cards = await cardRepository.findCardById(id, userId);
  if (!cards) {
    throw { type: "not_found" };
  }
  await cardRepository.removeById(id);
}

export default { create, getAll, get, remove };
