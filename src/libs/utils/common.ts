import { notifications } from "@mantine/notifications";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const handleError = (error: any) => {
  if (error?.data?.message && typeof error?.data?.message === "string") {
    notifications.show({
      title: "エラー",
      message: error?.data?.message as string,
      color: "red",
    });
  } else if (
    error?.response?.data?.message &&
    typeof error?.response?.data?.message === "string"
  ) {
    notifications.show({
      title: "エラー",
      message: error?.response?.data?.message as string,
      color: "red",
    });
  } else {
    notifications.show({
      title: "エラー",
      message: "システムエラー",
      color: "red",
    });
  }
};

export const numberWithCommas = (num: number | string) => {
  if (!num) return 0;
  const arr = num.toString().split(".");
  if (arr.length === 1) {
    return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + arr[1];
};
