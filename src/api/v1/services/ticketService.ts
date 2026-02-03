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

let list: Ticket[] = [
  { id: 1, title: "Update footer copyright year", description: "Footer still shows 2024", priority: "low", status: "open", createdAt: daysAgo(3) },
  { id: 2, title: "Profile picture upload slow", description: "Upload takes 30+ seconds", priority: "medium", status: "open", createdAt: daysAgo(2) },
  { id: 3, title: "Dashboard loading slowly", description: "Dashboard takes 10+ seconds to load", priority: "medium", status: "open", createdAt: daysAgo(6) },
  { id: 4, title: "Password reset email delayed", description: "Reset emails taking over 30 minutes", priority: "high", status: "open", createdAt: daysAgo(5) },
  { id: 5, title: "Export to PDF not working", description: "PDF export fails silently", priority: "high", status: "open", createdAt: daysAgo(9) },
  { id: 6, title: "Login page not loading", description: "Users report blank screen on login", priority: "critical", status: "open", createdAt: daysAgo(6) },
  { id: 7, title: "Dark mode toggle broken", description: "Dark mode doesn't persist after refresh", priority: "medium", status: "resolved", createdAt: daysAgo(10) },
];

export const addOne = (body: NewTicket): Ticket => {
  const nextId = list.length > 0 ? Math.max(...list.map(t => t.id)) + 1 : 1;

  const t: Ticket = {
    id: nextId,
    title: body.title,
    description: body.description,
    priority: body.priority,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  list.push(t);
  return structuredClone(t);
};

export const editOne = (id: number, body: EditTicket): Ticket | undefined => {
  const i = list.findIndex(t => t.id === id);
  return i === -1 ? undefined : (list[i] = { ...list[i], ...body });
};

export const removeOne = (id: number): boolean => {
  const i = list.findIndex(t => t.id === id);
  return i === -1 ? false : !!list.splice(i, 1);
};

// basic functions
export const getAll = (): Ticket[] => structuredClone(list);
export const getOne = (id: number): Ticket | undefined => list.find(t => t.id === id);
