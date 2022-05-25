import { StylesConfig } from "react-select";
import chroma from "chroma-js";

export type TagOption = {
  value: string;
  label: string;
  color: string;
};

export const TagOptions: TagOption[] = [
  { value: "Blockchain", label: "Blockchain", color: "#8E477F" },
  { value: "Frontend", label: "Frontend", color: "#8E477F" },
  { value: "Backend", label: "Backend", color: "#8E477F" },
  { value: "NFT", label: "NFT", color: "#8E477F" },
  { value: "Solidity", label: "Solidity", color: "#8E477F" },
  { value: "Ethereum", label: "Ethereum", color: "#8E477F" },
  { value: "Polygon", label: "Polygon", color: "#8E477F" },
  { value: "Solana", label: "Solana", color: "#8E477F" },
  { value: "Polkadot", label: "Polkadot", color: "#8E477F" },
  { value: "Web", label: "Web", color: "#8E477F" },
  { value: "Mobileapp", label: "Mobileapp", color: "#8E477F" },
  { value: "DAO", label: "DAO", color: "#8E477F" },
  { value: "Defi", label: "Defi", color: "#8E477F" },
  { value: "Game", label: "Game", color: "#8E477F" },
  { value: "Twitter", label: "Twitter", color: "#8E477F" },
  { value: "Youtube", label: "Youtube", color: "#8E477F" },
  { value: "Discord", label: "Discord", color: "#8E477F" },
  { value: "Telegram", label: "Telegram", color: "#8E477F" },
  { value: "ENS", label: "ENS", color: "#8E477F" },
  {
    value: "Community Moderator",
    label: "Community Moderator",
    color: "#8E477F",
  },
  { value: "Medium", label: "Medium", color: "#8E477F" },
  { value: "Substack", label: "Substack", color: "#8E477F" },
  { value: "Mirror", label: "Mirror", color: "#8E477F" },
  { value: "MusicNFT", label: "MusicNFT", color: "#8E477F" },
  { value: "Fundraise", label: "Fundraise", color: "#8E477F" },
  { value: "Gitcoin", label: "Gitcoin", color: "#8E477F" },
  { value: "ICO", label: "ICO", color: "#8E477F" },
  { value: "Grant", label: "Grant", color: "#8E477F" },
];

export const getTagOption = (tag: string): TagOption => {
  const tagOp = TagOptions.find((t) => t.value === tag);
  return tagOp ? tagOp : { value: tag, label: tag, color: "#8E477F" };
};

export const colourStyles: StylesConfig<TagOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: 0,
    boxShadow: "none",
    display: "inline-block",
  }),
  placeholder: (base) => ({
    ...base,
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    padding: "0.5rem",
    width: "fit-content",
  }),
  menuList: () => ({
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    maxHeight: "20rem",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color || "#8E477F");
    return {
      ...styles,
      backgroundColor: color.alpha(0.3).css(),
      padding: "0.5rem 1.25rem 0.5rem 1.25rem",
      marginBottom: "0.75rem",
      display: "inline-block",
      borderRadius: "1rem",
      width: "fit-content",
      color: isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
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
    const color = chroma(data.color || "#8E477F");
    return {
      ...styles,
      backgroundColor: "#F6F6F6",
      color: data.color || "#8E477F",
      fontSize: "medium",
      padding: "0.25rem 0.25rem 0.25rem 0.75rem",
      borderRadius: "1rem",
      margin: "0.5rem 0.5rem 0.5rem 0",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color || "#8E477F",
  }),
  multiValueRemove: (styles, { data }) => {
    const color = chroma(data.color || "#8E477F");
    return {
      ...styles,
      color: data.color || "#8E477F",
      ":hover": {
        backgroundColor: color.alpha(0.3).css(),
        color: "white",
        borderRadius: "1rem",
      },
    };
  },
};
