import { urgency } from "../src/api/v1/services/ticketService";
import { Ticket } from "../src/data/ticketData";

describe("Urgency function", () => {
  const now = new Date("2025-01-15T10:00:00.000Z");

  