export const convertDateToStr = (date: Date, format: string): string => {
  const year_str = date.getFullYear().toString();
  const month_str = (1 + date.getMonth()).toString();
  const day_str = date.getDate().toString();

  let format_str = format;
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);

  return format_str;
};

export const convertStrToDate = (dateStr: string): Date => {
  return new Date(dateStr);
};
