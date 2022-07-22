import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/config/database.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE ;`;
  // await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("user tests suite", () => {
  it("given email and password, create user", async () => {
    const response = await supertest(app)
      .post("/signup")
      .send({ email: "admin@admin.com", password: "1234567890" });
    expect(response.status).toBe(201);
  });

  it("given email that already exists, fail to create user", async () => {
    await supertest(app)
      .post("/signup")
      .send({ email: "admin@admin.com", password: "1234567890" });

    const response = await supertest(app)
      .post("/signup")
      .send({ email: "admin@admin.com", password: "1234567890" });
    expect(response.status).toBe(409);
  });

  it("missing email or password, fail to create user", async () => {
    const response = await supertest(app)
      .post("/signup")
      .send({ email: "admin@admin.com" });
    expect(response.status).toBe(422);

    const response2 = await supertest(app)
      .post("/signup")
      .send({ password: "1234567890" });
    expect(response2.status).toBe(422);
  });

  it("given email and password, recive token", async () => {
    await supertest(app)
      .post("/signUp")
      .send({ email: "admin@admin.com", password: "1234567890" });

    const response = await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "1234567890" });
    const token = response.body.token;
    console.log("AAAAAAAAA", token);
    expect(token).not.toBeNull();
  });

  it("given email that doesnt exists, fail to login", async () => {
    const response = await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "abcd123456" });
    expect(response.status).toBe(404);
  });

  it("given wrong password, fail to login", async () => {
    await supertest(app)
      .post("/signup")
      .send({ email: "admin@admin.com", password: "1234567890" });

    const response = await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "senhaErrada" });
    expect(response.status).toBe(409);
  });
});

describe("note tests suite", () => {
  it("given randon token, fail to create note", async () => {
    const response = await supertest(app)
      .post("/note/create")
      .auth("fakeToken", { type: "bearer" })
      .send({
        title: "dasdasdsaaa",
        body: "123",
      });
    expect(response.status).toBe(401);
  });

  it("catch token, create note", async () => {
    await supertest(app)
      .post("/signUp")
      .send({ email: "admin@admin.com", password: "1234567890" });

    const response = await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "1234567890" });
    const token = response.body.token;

    expect(token).not.toBeNull();

    const response3 = await supertest(app)
      .post("/note/create")
      .auth(token, { type: "bearer" })
      .send({
        title: "dasdasdsaaa",
        body: "123",
      });
    expect(response3.status).toBe(200);
  });

  it("given wrong inputs, fail to create note", async () => {
    await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "1234567890" });

    const response1 = await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "1234567890" });
    const token = response1.body.token;
    expect(token).not.toBeNull();

    const response = await supertest(app)
      .post("/note/create")
      .auth(token, { type: "bearer" })
      .send({
        title: "",
        body: "123",
      });
    expect(response.status).toBe(422);

    const response2 = await supertest(app)
      .post("/note/create")
      .auth(token, { type: "bearer" })
      .send({
        title: "aaaaaaaaaaaa",
        body: "",
      });
    expect(response2.status).toBe(422);
  });

  it("given repeated title, fail create note", async () => {
    await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "1234567890" });

    const response1 = await supertest(app)
      .post("/")
      .send({ email: "admin@admin.com", password: "1234567890" });
    const token = response1.body.token;
    expect(token).not.toBeNull();

    const response = await supertest(app)
      .post("/note/create")
      .auth(token, { type: "bearer" })
      .send({
        title: "dasdasdsaaa",
        body: "123",
      });
    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
