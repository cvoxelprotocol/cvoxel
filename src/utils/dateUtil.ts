export const convertTimestampToDateStr = (timestamp: string): string => {
  const d = new Date(Number(timestamp) * 1000);
  return formatDate(d.toISOString());
};

const formatDate = (dateStr: string): string => {
  const d = dateStr.split("-");
  return `${d[2].split("T")[0]}-${d[1]}-${d[0]}`;
};
