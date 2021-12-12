const request = require("supertest");
const { describe, it, expect, beforeEach } = require("@jest/globals");
const app = require("../../src/app");
const truncate = require("../utils/truncate");
const  factory  = require("../factory");

describe("#Authenticate", () => {
	beforeEach(async () => {
		await truncate();
	});

	it("->Should authenticate with valid credentials", async () => {
		const user = await factory.create("User", {
			password: "123123"
		});

		const response = await request(app).post("/sessions").send({
			email: user.email,
			password: "123123"
		});

		expect(response.status).toBe(200);
	});

	it("->Should not authenticate with invalid creadentials", async () => {
		const user = await factory.create("User");

		const response = await request(app).post("/sessions").send({
			email: user.email,
			password: "123457"
		});

		expect(response.status).toBe(401);
	});

	it("->Should return JWT token when authenticated", async () => {
		const user = await factory.create("User",{
			password: "123456"
		});

		const response = await request(app).post("/sessions").send({
			email: user.email,
			password: "123456"
		});

		expect(response.body).toHaveProperty("token");
	});

	it("->Should be able access private routes when authenticated", async () => {
		const user = await factory.create("User",{
			password: "123456"
		});

		const response = await request(app).get("/dashboard").set("Authorization", `Bearer ${user.generateToken()}`);

		expect(response.status).toBe(200);
	});

	it("->Should not be able access private routes whitout JWT token", async () => {

		const response = await request(app).get("/dashboard");

		expect(response.status).toBe(401);
	});

	it("->Should not be able access private routes with invalid JWT token", async () => {

		const response = await request(app).get("/dashboard").set("Authorization", "Bearer 123123");

		expect(response.status).toBe(401);
	});
});
