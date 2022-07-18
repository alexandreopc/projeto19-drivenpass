import { Network } from "@prisma/client";
import Cryptr from "cryptr";

import networkRepository from "../repositories/networkRepository.js";

export type CreateNetworkData = Omit<Network, "id" | "createdAt">;

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function create(data: CreateNetworkData) {
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
  const networks = await networkRepository.findNetworksByUserId(userId);
  if (networks.length === 0) {
    throw { type: "not_found" };
  }

  const decryptedNetworks = networks.map((network) => {
    const decryptedPassword = cryptr.decrypt(network.password);
    return {
      ...network,
      password: decryptedPassword,
    };
  });
  return decryptedNetworks;
}

async function get(id: number, userId: number) {
  const networks = await networkRepository.findNetworkById(id, userId);
  if (!networks) {
    throw { type: "not_found" };
  }

  const decryptedPassword = cryptr.decrypt(networks.password);
  return {
    ...networks,
    password: decryptedPassword,
  };
}

async function remove(id: number, userId: number) {
  const networks = await networkRepository.findNetworkById(id, userId);
  if (!networks) {
    throw { type: "not_found" };
  }
  await networkRepository.removeById(id);
}

export default { create, getAll, get, remove };
