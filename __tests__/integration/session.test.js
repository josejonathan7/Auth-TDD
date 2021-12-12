const { User } = require("../../src/app/models");
const { describe, it, expect } = require("@jest/globals");

describe("#Authenticate", () => {

	it("->Should sum two numbers", async () => {
		const user = await User.create({ name: "jose", email: "jonahtan@gmail.com", password_hash: "asdasda"});
		console.log(user);

		expect(user.name).toBe("jose");

	});
});
