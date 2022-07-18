import { Credential } from "@prisma/client";
import Cryptr from "cryptr";

import credentialRepository from "../repositories/credentialRepository.js";

export type CreateCredentialData = Omit<Credential, "id" | "createdAt">;

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function create(data: CreateCredentialData) {
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

  const decryptedCredentials = credentials.map((credential) => {
    const decryptedPassword = cryptr.decrypt(credential.password);
    return { ...credential, password: decryptedPassword };
  });

  return decryptedCredentials;
}

async function get(id: number, userId: number) {
  const credentials = await credentialRepository.findCredentialById(id, userId);
  if (!credentials) {
    throw { type: "not_found" };
  }

  const decryptedPassword = cryptr.decrypt(credentials.password);
  return { ...credentials, password: decryptedPassword };
}

async function remove(id: number, userId: number) {
  const credentials = await credentialRepository.findCredentialById(id, userId);
  if (!credentials) {
    throw { type: "not_found" };
  }

  await credentialRepository.removeById(id);
}

export default { create, getAll, get, remove };
