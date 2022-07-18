import { FC } from "react";
import SmallUp from "@/components/common/arrow/small/up-arrow.svg";
import SmallDown from "@/components/common/arrow/small/down-arrow.svg";
import MediumUp from "@/components/common/arrow/medium/up-arrow.svg";
import MediumDown from "@/components/common/arrow/medium/down-arrow.svg";
import LargeUp from "@/components/common/arrow/large/up-arrow.svg";
import LargeDown from "@/components/common/arrow/large/down-arrow.svg";

type Props = {
  size: "sm" | "md" | "lg";
  direction: "up" | "down";
};
export const Arrow: FC<Props> = ({ size, direction }) => {
  switch (size) {
    case "sm":
      switch (direction) {
        case "up":
          return <SmallUp />;
        case "down":
          return <SmallDown />;
      }
      break;
    case "md":
      switch (direction) {
        case "up":
          return <MediumUp />;
        case "down":
          return <MediumDown />;
      }
      break;
    case "lg":
      switch (direction) {
        case "up":
          return <LargeUp />;
        case "down":
          return <LargeDown />;
      }
  }
};
