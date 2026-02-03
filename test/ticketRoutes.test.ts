import request from "supertest";
import app from "../src/app";
import { resetForTests } from "../src/api/v1/services/ticketService";

describe("Ticket API routes", () => {
  beforeEach(() => resetForTests(new Date("2025-01-15T10:00:00.000Z")));

  it("should return health check", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
  });

  