import { urgency } from "../src/api/v1/services/ticketService";
import { Ticket } from "../src/data/ticketData";

describe("Urgency function", () => {
  const now = new Date("2025-01-15T10:00:00.000Z");

  it("should return LOW for low + 3 days => 25", () => {
  const t: Ticket = {
    id: 1,
    title: "x",
    description: "x",
    priority: "low",
    status: "open",
    createdAt: new Date("2025-01-12T10:00:00.000Z").toISOString(),
  };

  const out = urgency(t, now);
  expect(out.urgencyScore).toBe(25);
  expect(out.urgencyLevel).toBe(
    "Low urgency. Address when capacity allows."
  );
});

  it("should return CRITICAL for critical + 6 days => 80", () => {
  const t: Ticket = {
    id: 2,
    title: "x",
    description: "x",
    priority: "critical",
    status: "open",
    createdAt: new Date("2025-01-09T10:00:00.000Z").toISOString(),
  };

  const out = urgency(t, now);
  expect(out.urgencyScore).toBe(80);
  expect(out.urgencyLevel).toBe(
    "Critical. Immediate attention required."
  );
});

