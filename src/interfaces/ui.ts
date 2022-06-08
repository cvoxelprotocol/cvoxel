export const TAB_NAME = {
  cvoxels: "My vess",
  transactions: "Transactions",
  notifications: "Notifications",
  search: "Search",
} as const;

type TabType = typeof TAB_NAME;
export type TabKey = keyof TabType;
