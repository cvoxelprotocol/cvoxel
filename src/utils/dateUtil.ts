export const convertTimestampToDateStr = (timestamp: string): string => {
  const d = new Date(Number(timestamp) * 1000);
  return formatDate(d.toISOString());
};

const formatDate = (dateStr: string): string => {
  const d = dateStr.split("-");
  return `${d[2].split("T")[0]}-${d[1]}-${d[0]}`;
};

export const convertDateToTimestampStr = (date: Date): string => {
  return Math.floor(date.getTime() / 1000).toString();
};

export const convertDateToTimeAgo = (date: Date): string => {
  const now = new Date(Date.now());
  const diffTime = now.getTime() - date.getTime();
  const diffDate = new Date(diffTime - 5.5 * 60 * 60 * 1000);
  const [sec, min, hr, day, month] = [
    diffDate.getSeconds(),
    diffDate.getMinutes(),
    diffDate.getHours(),
    diffDate.getDate() - 1,
    diffDate.getMonth(),
  ];
  const f = (property: number, end: string) => {
    // console.log(property,end)
    return `${property} ${end}${property > 1 ? "s" : ""} ago`;
  };
  // console.log(diffDate.toLocaleString());
  return month >= 1
    ? f(month, "month")
    : day >= 1
    ? f(day, "day")
    : hr >= 1
    ? f(hr, "hour")
    : min >= 1
    ? f(min, "minute")
    : day >= 1
    ? f(sec, "second")
    : "";
};
