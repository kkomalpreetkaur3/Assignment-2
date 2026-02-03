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

const daysAgo = (now: Date, days: number): string => {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const makeTickets = (now: Date = new Date()): Ticket[] => [
  {
    id: 1,
    title: "Update footer copyright year",
    description: "Footer still shows 2024",
    priority: "low",
    status: "open",
    createdAt: daysAgo(now, 3),
  },
  {
    id: 2,
    title: "Profile picture upload slow",
    description: "Upload takes 30+ seconds",
    priority: "medium",
    status: "open",
    createdAt: daysAgo(now, 2),
  },
  {
    id: 3,
    title: "Dashboard loading slowly",
    description: "Dashboard takes 10+ seconds to load",
    priority: "medium",
    status: "open",
    createdAt: daysAgo(now, 6),
  },
  {
    id: 4,
    title: "Password reset email delayed",
    description: "Reset emails taking over 30 minutes",
    priority: "high",
    status: "open",
    createdAt: daysAgo(now, 5),
  },
  {
    id: 5,
    title: "Export to PDF not working",
    description: "PDF export fails silently",
    priority: "high",
    status: "open",
    createdAt: daysAgo(now, 9),
  },
  {
    id: 6,
    title: "Login page not loading",
    description: "Users report blank screen on login",
    priority: "critical",
    status: "open",
    createdAt: daysAgo(now, 6),
  },
  {
    id: 7,
    title: "Dark mode toggle broken",
    description: "Dark mode doesn't persist after refresh",
    priority: "medium",
    status: "resolved",
    createdAt: daysAgo(now, 10),
  },
];
