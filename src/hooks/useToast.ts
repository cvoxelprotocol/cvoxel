import toast from "react-hot-toast";

const defaultErrorMessage = "Something went wrong. Please try again.";

const displayError = (error?: any) => {
  if (!error) return defaultErrorMessage;
  if (typeof error === "string") return error;
  const data = error.response?.data;
  if (data?.errors) return Object.values(data?.errors).join(" ");
  return data?.message || error.message || defaultErrorMessage;
};

export const useToast = (): {
  lancInfo: (message: string) => void;
  lancError: (error?: any) => void;
} => {
  return {
    lancInfo: (message: string) => toast(message, { className: "bg-primary" }),
    lancError: (error: any) => toast.error(displayError(error)),
  };
};
