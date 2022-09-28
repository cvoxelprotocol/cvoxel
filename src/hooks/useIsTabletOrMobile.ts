import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

// @ts-ignore
const fullConfig = resolveConfig(tailwindConfig);

export const useIsTabletOrMobile = () => {
  const isTabletOrMobile = useMediaQuery({
    // @ts-ignore
    query: `(max-width: ${fullConfig.theme?.screens?.lg})`,
  });
  return { isTabletOrMobile };
};
