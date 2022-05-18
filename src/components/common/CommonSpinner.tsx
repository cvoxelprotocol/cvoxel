import { FC, useMemo } from "react";

type CommonSpinnerprops = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
};
export const CommonSpinner: FC<CommonSpinnerprops> = ({
  size = "md",
  color = "secondary",
}) => {
  const spinnerSize = useMemo(() => {
    if (size === "sm") return "h-4 w-4";
    if (size === "md") return "h-7 w-7";
    return "h-10 w-10";
  }, [size]);

  const spinnerColor = useMemo(() => {
    if (color === "primary") return "border-primary";
    return "border-secondary";
  }, [color]);

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin ${spinnerSize} border-2 ${spinnerColor} rounded-full border-t-transparent`}
      ></div>
    </div>
  );
};
