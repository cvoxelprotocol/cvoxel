export const TAB_NAME = {
  cvoxels: "VOXELs",
  transactions: "Transactions",
  notifications: "Notifications",
  search: "Search",
} as const;

type TabType = typeof TAB_NAME;
export type TabKey = keyof TabType;

export const TX_TAB_NAME = {
  received: "Received",
  sent: "Sent",
} as const;

type TxTabType = typeof TX_TAB_NAME;
export type TxTabKey = keyof TxTabType;
