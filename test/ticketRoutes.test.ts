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

  it("should get all tickets", async () => {
    const res = await request(app).get("/api/v1/tickets");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tickets retrieved");
    expect(res.body.count).toBeGreaterThan(0);
  });

  it("should get one ticket by id", async () => {
    const res = await request(app).get("/api/v1/tickets/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Ticket retrieved");
    expect(res.body.data.id).toBe(1);
  });

  it("should return 404 for missing ticket id", async () => {
    const res = await request(app).get("/api/v1/tickets/999");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Ticket not found");
  });

  it("should create ticket", async () => {
    const res = await request(app).post("/api/v1/tickets").send({
      title: "Test ticket",
      description: "Test desc",
      priority: "low",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Ticket created");
    expect(res.body.data.status).toBe("open");
  });

  it("should return 400 when title missing", async () => {
    const res = await request(app).post("/api/v1/tickets").send({
      description: "Test desc",
      priority: "low",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required field: title");
  });

  it("should return urgency for ticket 1 (score 25)", async () => {
    const res = await request(app).get("/api/v1/tickets/1/urgency");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Ticket urgency calculated");
    expect(res.body.data.urgencyScore).toBe(25);
  });

  it("should return 404 urgency when ticket not found", async () => {
    const res = await request(app).get("/api/v1/tickets/999/urgency");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Ticket not found");
  });
});
