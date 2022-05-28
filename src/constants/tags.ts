import { StylesConfig } from "react-select";
import chroma from "chroma-js";

export type TagOption = {
  value: string;
  label: string;
  color: string;
};

export const TagOptions: TagOption[] = [
  { value: "Blockchain", label: "Blockchain", color: "#4791FF" },
  { value: "Frontend", label: "Frontend", color: "#4791FF" },
  { value: "Backend", label: "Backend", color: "#4791FF" },
  { value: "NFT", label: "NFT", color: "#4791FF" },
  { value: "Solidity", label: "Solidity", color: "#4791FF" },
  { value: "Ethereum", label: "Ethereum", color: "#4791FF" },
  { value: "Polygon", label: "Polygon", color: "#4791FF" },
  { value: "Solana", label: "Solana", color: "#4791FF" },
  { value: "Polkadot", label: "Polkadot", color: "#4791FF" },
  { value: "Web", label: "Web", color: "#4791FF" },
  { value: "Mobileapp", label: "Mobileapp", color: "#4791FF" },
  { value: "DAO", label: "DAO", color: "#4791FF" },
  { value: "Defi", label: "Defi", color: "#4791FF" },
  { value: "Game", label: "Game", color: "#4791FF" },
  { value: "Twitter", label: "Twitter", color: "#4791FF" },
  { value: "Youtube", label: "Youtube", color: "#4791FF" },
  { value: "Discord", label: "Discord", color: "#4791FF" },
  { value: "Telegram", label: "Telegram", color: "#4791FF" },
  { value: "ENS", label: "ENS", color: "#4791FF" },
  {
    value: "Community Moderator",
    label: "Community Moderator",
    color: "#4791FF",
  },
  { value: "Medium", label: "Medium", color: "#4791FF" },
  { value: "Substack", label: "Substack", color: "#4791FF" },
  { value: "Mirror", label: "Mirror", color: "#4791FF" },
  { value: "MusicNFT", label: "MusicNFT", color: "#4791FF" },
  { value: "Fundraise", label: "Fundraise", color: "#4791FF" },
  { value: "Gitcoin", label: "Gitcoin", color: "#4791FF" },
  { value: "ICO", label: "ICO", color: "#4791FF" },
  { value: "Grant", label: "Grant", color: "#4791FF" },
];

export const getTagOption = (tag: string): TagOption => {
  const tagOp = TagOptions.find((t) => t.value === tag);
  return tagOp ? tagOp : { value: tag, label: tag, color: "#4791FF" };
};

export const colourStyles: StylesConfig<TagOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: 0,
    boxShadow: "none",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color || "#4791FF");
    return {
      ...styles,
      backgroundColor: isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color || "#4791FF");
    return {
      ...styles,
      backgroundColor: "#F6F6F6",
      color: data.color || "#4791FF",
      fontWeight: "bold",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color || "#4791FF",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color || "#4791FF",
    ":hover": {
      backgroundColor: data.color || "#4791FF",
      color: "white",
    },
  }),
};
