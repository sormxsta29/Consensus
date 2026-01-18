export type Contract = {
  id: string;
  title: string;
  owner: string;
  status: "Draft" | "Review" | "Approved" | "Expired";
  type: string;
  expiry: string;
  versions: { v: number; text: string; ts: string }[];
  aiAlerts?: string[];
  chainEvents?: { ts: string; action: string }[];
};

export const mockContracts: Contract[] = [
  {
    id: "C-1001",
    title: "SaaS Master Agreement",
    owner: "Legal - Alice",
    status: "Review",
    type: "Master Agreement",
    expiry: "2026-06-30",
    versions: [
      { v: 1, text: "Initial draft with vendor limits.", ts: "2025-12-01" },
      { v: 2, text: "Added indemnity clause; changed payment terms.", ts: "2025-12-10" }
    ],
    aiAlerts: ["Clause: Indemnity changed (risk increase)"],
    chainEvents: [{ ts: "2025-12-11", action: "hash_registered" }]
  },
  {
    id: "C-1002",
    title: "NDA - Partner",
    owner: "Ops - Bob",
    status: "Approved",
    type: "NDA",
    expiry: "2027-01-15",
    versions: [
      { v: 1, text: "Standard NDA v1.", ts: "2024-01-01" }
    ],
    aiAlerts: [],
    chainEvents: [{ ts: "2024-01-02", action: "hash_registered" }]
  }
];
