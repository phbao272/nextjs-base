import { addMinutes, format } from "date-fns";

export const numberWithCommas = (num: number | string) => {
  if (!num) return 0;
  const arr = num.toString().split(".");
  if (arr.length === 1) {
    return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + arr[1];
};

export function formatRoundNumber(number: number) {
  return Math.round(number);
}

export function formatJPNumber(number: number) {
  return new Intl.NumberFormat("ja-JP").format(formatRoundNumber(number));
}

export const formatDateTime = (
  date: string | Date,
  formatString = "yyyy-MM-dd HH:mm:ss"
) => {
  if (!date) return "";

  console.log("date", date);

  const d = date instanceof Date ? date : new Date(date);

  console.log("d", d);

  return format(addMinutes(d, -d.getTimezoneOffset()), formatString);
};

export const formatDateTimeTZ = (
  date: string | Date,
  formatString = "yyyy-MM-dd HH:mm:ss"
) => {
  if (!date) return "";


  const d = date instanceof Date ? date : new Date(date);

  return format(d, formatString);
};