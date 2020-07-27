import moment from "moment";

export const getMean = function (data: number[]) {
  return (
    data.reduce(function (a, b) {
      return Number(a) + Number(b);
    }) / data.length
  );
};

export const getStdDeviation = function (data: number[]) {
  let m = getMean(data);
  return Math.sqrt(
    data.reduce(function (sq, n) {
      return sq + Math.pow(n - m, 2);
    }, 0) /
      (data.length - 1)
  );
};

export const formatDateString = (date: string) => {
  const dateString = date.toString();
  const formatedDateString = [
    dateString.slice(0, 4),
    dateString.slice(4, 6),
    dateString.slice(6),
  ].join("-");
  return formatedDateString;
};

export const getRequiredDateFormat = (date: string, format = "MM-DD-YYYY") => {
  const dateString = formatDateString(date);
  return moment(dateString).format(format);
};

export const formatDate = (date: string, tickSetting: string) => {
  const dateString = formatDateString(date);
  if (tickSetting === "days") return getRequiredDateFormat(date, "MMM-DD");
  const formattedDateString = getRequiredDateFormat(date, "MMMM");
  return dateString.slice(-2) === "01" ? formattedDateString : "";
};

export const fetcher = (...args: any) =>
  fetch(...args).then((res: any) => res.json());

export const getTickSetting = (range: number) =>
  Math.abs(range) === 10 ? "days" : "months";
