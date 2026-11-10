import { toast } from "sonner";

export const handleError = (
  error: any,
  defaultMsg: string = "Đã có lỗi xảy ra"
) => {
  console.error("API Error:", error);

  const serverMessage = error?.response?.data?.message;

  const finalMessage = Array.isArray(serverMessage)
    ? serverMessage[0]
    : serverMessage || defaultMsg;

  toast.error(finalMessage);
  return finalMessage;
};

