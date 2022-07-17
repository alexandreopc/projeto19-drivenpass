import { Credential } from "@prisma/client";
import Cryptr from "cryptr";

import credentialRepository from "../repositories/credentialRepository.js";

export type CreateCredentialData = Omit<Credential, "id" | "createdAt">;

async function create(data: CreateCredentialData) {
  const cryptr = new Cryptr(process.env.JWT_SECRET);
  // const decryptedString = cryptr.decrypt(encryptedString);
  const encryptedPassword = cryptr.encrypt(data.password);
  delete data.password;
  data = { ...data, password: encryptedPassword };
  const isInvalidLabel =
    await credentialRepository.findCredentialsByNameAndUserId(data);
  if (isInvalidLabel) {
    console.log("label repetida por userId");
    throw { type: "conflict" };
  }

  await credentialRepository.create(data);
}

async function getAll(userId: number) {
  const credentials = await credentialRepository.findCredentialsByUserId(
    userId
  );
  if (credentials.length === 0) {
    throw { type: "not_found" };
  }
  return credentials;
}

async function get(id: number, userId: number) {
  const credentials = await credentialRepository.findCredentialById(id, userId);
  if (!credentials) {
    throw { type: "not_found" };
  }
  return credentials;
}

async function remove(id: number, userId: number) {
  const credentials = await credentialRepository.findCredentialById(id, userId);
  if (!credentials) {
    throw { type: "not_found" };
  }

  await credentialRepository.removeById(id);
}

export default { create, getAll, get, remove };
