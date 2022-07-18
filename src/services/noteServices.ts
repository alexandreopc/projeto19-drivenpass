import { Note } from "@prisma/client";
import Cryptr from "cryptr";

import noteRepository from "../repositories/noteRepository.js";

export type CreateNoteData = Omit<Note, "id" | "createdAt">;

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function create(data: CreateNoteData) {
  const encryptedBody = cryptr.encrypt(data.body);
  delete data.body;
  data = { ...data, body: encryptedBody };
  const isInvalidTitle = await noteRepository.findNoteByTilteAndUserId(data);
  if (isInvalidTitle) {
    console.log("titulo repetido por userId");
    throw { type: "conflict" };
  }

  await noteRepository.create(data);
}

async function getAll(userId: number) {
  const notes = await noteRepository.findNotesByUserId(userId);
  if (notes.length === 0) {
    throw { type: "not_found" };
  }

  const decryptedNotes = notes.map((note) => {
    const decryptedPassword = cryptr.decrypt(note.body);
    return { ...note, body: decryptedPassword };
  });
  return decryptedNotes;
}

async function get(id: number, userId: number) {
  const notes = await noteRepository.findNoteById(id, userId);
  if (!notes) {
    throw { type: "not_found" };
  }

  const decryptedPassword = cryptr.decrypt(notes.body);
  return { ...notes, body: decryptedPassword };
}

async function remove(id: number, userId: number) {
  const notes = await noteRepository.findNoteById(id, userId);
  if (!notes) {
    throw { type: "not_found" };
  }

  await noteRepository.removeById(id);
}

export default { create, getAll, get, remove };
