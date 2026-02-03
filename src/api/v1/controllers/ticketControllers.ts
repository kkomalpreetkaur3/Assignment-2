import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as svc from "../services/ticketService";

export const getAllTickets = (req: Request, res: Response): void => {
  const data = svc.getAll();
  res.status(HTTP_STATUS.OK).json({
    message: "Tickets retrieved",
    count: data.length,
    data,
  });
};

export const getTicket = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const ticket = svc.getOne(id);

  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json({ message: "Ticket retrieved", data: ticket });
};

export const createTicket = (req: Request, res: Response): void => {
  const { title, description, priority } = req.body as {
    title?: string;
    description?: string;
    priority?: unknown;
  };

  const err =
    !title
      ? "Missing required field: title"
      : !description
      ? "Missing required field: description"
      : !svc.isPri(priority)
      ? "Invalid priority. Must be one of: critical, high, medium, low"
      : null;

  err
    ? res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err })
    : res.status(HTTP_STATUS.CREATED).json({
        message: "Ticket created",
        data: svc.addOne({
          title: title as string,
          description: description as string,
          priority: priority as any,
        }),
      });
};


export const updateTicket = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const { title, description, priority, status } = req.body as {
    title?: string;
    description?: string;
    priority?: unknown;
    status?: unknown;
  };

  const err =
    priority !== undefined && !svc.isPri(priority)
      ? "Invalid priority. Must be one of: critical, high, medium, low"
      : status !== undefined && !svc.isStat(status)
      ? "Invalid status. Must be one of: open, in-progress, resolved"
      : null;

  if (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err });
    return;
  }

  const ticket = svc.editOne(id, {
    title,
    description,
    priority: priority as any,
    status: status as any,
  });

  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json({ message: "Ticket updated", data: ticket });
};

export const deleteTicket = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const ok = svc.removeOne(id);

  ok
    ? res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" })
    : res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
};

export const getUrgency = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const ticket = svc.getOne(id);

  ticket
    ? res.status(HTTP_STATUS.OK).json({
        message: "Ticket urgency calculated",
        data: svc.urgency(ticket),
      })
    : res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
};
