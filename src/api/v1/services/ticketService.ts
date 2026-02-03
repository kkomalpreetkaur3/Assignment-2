export type Pri = "critical" | "high" | "medium" | "low";
export type Stat = "open" | "in-progress" | "resolved";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Pri;
  status: Stat;
  createdAt: string;
}

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

// date helper (relative dates)
const daysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

// basic functions
export const getAll = (): Ticket[] => structuredClone(list);
export const getOne = (id: number): Ticket | undefined => list.find(t => t.id === id);
