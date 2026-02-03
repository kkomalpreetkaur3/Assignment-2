import { makeTickets, Ticket, Pri, Stat } from "../../../data/ticketData";

export interface NewTicket {
  title: string;
  description: string;
  priority: Pri;
}

export interface EditTicket {
  title?: string;
  description?: string;
  priority?: Pri;
  status?: Stat;
}

export interface UrgOut {
  id: number;
  title: string;
  priority: Pri;
  status: Stat;
  createdAt: string;
  ticketAge: number;
  urgencyScore: number;
  urgencyLevel: string;
}

const priList: Pri[] = ["critical", "high", "medium", "low"];
const statList: Stat[] = ["open", "in-progress", "resolved"];

const nowForApi = (): Date => {
  const v = process.env.TEST_NOW;
  return v ? new Date(v) : new Date();
};

let list: Ticket[] = makeTickets(nowForApi());

export const resetForTests = (now: Date = nowForApi()): void => {
  list = makeTickets(now);
};

export const isPri = (v: unknown): v is Pri =>
  typeof v === "string" ? priList.includes(v as Pri) : false;

export const isStat = (v: unknown): v is Stat =>
  typeof v === "string" ? statList.includes(v as Stat) : false;

export const getAll = (): Ticket[] => structuredClone(list);

export const getOne = (id: number): Ticket | undefined =>
  list.find((t) => t.id === id);

export const addOne = (body: NewTicket): Ticket => {
  const nextId = list.length > 0 ? Math.max(...list.map((t) => t.id)) + 1 : 1;

  const t: Ticket = {
    id: nextId,
    title: body.title,
    description: body.description,
    priority: body.priority,
    status: "open",
    createdAt: nowForApi().toISOString(), 
  };

  list.push(t);
  return structuredClone(t);
};

export const editOne = (id: number, body: EditTicket): Ticket | undefined => {
  const i = list.findIndex((t) => t.id === id);
  return i === -1 ? undefined : (list[i] = { ...list[i], ...body });
};

export const removeOne = (id: number): boolean => {
  const i = list.findIndex((t) => t.id === id);
  return i === -1 ? false : !!list.splice(i, 1);
};

const base = (p: Pri): number =>
  p === "critical" ? 50 : p === "high" ? 30 : p === "medium" ? 20 : 10;

const ageDays = (iso: string, now: Date): number => {
  const diff = now.getTime() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  return days < 0 ? 0 : days;
};

export const urgency = (t: Ticket, now: Date = nowForApi()): UrgOut => {
  const age = ageDays(t.createdAt, now);
  const score = t.status === "resolved" ? 0 : base(t.priority) + age * 5;

  const level =
    t.status === "resolved"
      ? "Minimal. Ticket resolved."
      : score < 30
      ? "Low urgency. Address when capacity allows."
      : score < 55
      ? "Moderate. Schedule for attention."
      : score < 80
      ? "High urgency. Prioritize resolution."
      : "Critical. Immediate attention required.";

  return {
    id: t.id,
    title: t.title,
    priority: t.priority,
    status: t.status,
    createdAt: t.createdAt,
    ticketAge: age,
    urgencyScore: score,
    urgencyLevel: level,
  };
};
