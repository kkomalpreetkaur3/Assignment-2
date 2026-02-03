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

// basic functions
export const getAll = (): Ticket[] => structuredClone(list);
export const getOne = (id: number): Ticket | undefined => list.find(t => t.id === id);
