import { Router } from "express";
import {
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getUrgency,
} from "../controllers/ticketControllers";

const r = Router();

r.get("/tickets", getAllTickets);
r.get("/tickets/:id", getTicket);
r.post("/tickets", createTicket);
r.put("/tickets/:id", updateTicket);
r.delete("/tickets/:id", deleteTicket);
r.get("/tickets/:id/urgency", getUrgency);


