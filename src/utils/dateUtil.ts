export const convertTimestampToDateStr = (timestamp: string): string => {
  const d = new Date(Number(timestamp) * 1000);
  return formatDate(d.toISOString());
};

const formatDate = (dateStr: string): string => {
  const d = dateStr.split("-");
  return `${d[2].split("T")[0]}-${d[1]}-${d[0]}`;
};

export const convertTimestampToDateStrLocaleUS = (
  timestamp: string
): string => {
  const d = new Date(Number(timestamp) * 1000);
  d.getMonth();
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${month} ${day} ${year} ${hours}:${minutes}:${seconds}`;
};

export const convertDateToTimestampStr = (date: Date): string => {
  return Math.floor(date.getTime() / 1000).toString();
};
