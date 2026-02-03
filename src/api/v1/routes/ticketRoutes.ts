import { Router } from "express";
import {
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getUrgency,
} from "../controllers/ticketControllers";

const router = Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicket);
router.post("/tickets", createTicket);
router.put("/tickets/:id", updateTicket);
router.delete("/tickets/:id", deleteTicket);
router.get("/tickets/:id/urgency", getUrgency);

export default router;
