import color from "color";
import { StylesConfig } from "react-select";

export type Genre = {
  id: number;
  label: string;
  value: string;
  colorCode: string;
  bgColor: string;
};
export const genreListV2: Genre[] = [
  {
    id: 0,
    label: "Dev",
    value: "Dev",
    colorCode: "#4285f4",
    bgColor: "bg-[#4285f4]",
  },
  {
    id: 1,
    label: "Marketing",
    value: "Marketing",
    colorCode: "#c755ff",
    bgColor: "bg-[#c755ff]",
  },
  {
    id: 2,
    label: "Design",
    value: "Design",
    colorCode: "#fbbc04",
    bgColor: "bg-[#fbbc04]",
  },
  // {
  //   id: 3,
  //   label: "Art",
  //   value: "Art",
  //   colorCode: "#f57d05",
  //   bgColor: "bg-[#f57d05]",
  // },
  {
    id: 4,
    label: "Community",
    value: "Community",
    colorCode: "#34a853",
    bgColor: "bg-[#34a853]",
  },
  // {
  //   id: 5,
  //   label: "Writing&Translation",
  //   value: "Writing&Translation",
  //   colorCode: "#5b46c6",
  //   bgColor: "bg-[#5b46c6]",
  // },
  // {
  //   id: 6,
  //   label: "Audio&Video",
  //   value: "Audio&Video",
  //   colorCode: "#ff63d6",
  //   bgColor: "bg-[#ff63d6]",
  // },
  // {
  //   id: 7,
  //   label: "Accounting&Consulting",
  //   value: "Accounting&Consulting",
  //   colorCode: "#95d500",
  //   bgColor: "bg-[#95d500]",
  // },
  {
    id: 8,
    label: "Donation&Investment",
    value: "Donation&Investment",
    colorCode: "#ff2c71",
    bgColor: "bg-[#ff2c71]",
  },
  // {
  //   id: 9,
  //   label: "Legal",
  //   value: "Legal",
  //   colorCode: "#fb4432",
  //   bgColor: "bg-[#fb4432]",
  // },
  {
    id: 10,
    label: "Other",
    value: "Other",
    colorCode: "#b7b7b7",
    bgColor: "bg-[#b7b7b7]",
  },
];
export const genreList: Genre[] = [
  {
    id: 0,
    label: "Dev",
    value: "Dev",
    colorCode: "#4285f4",
    bgColor: "bg-[#4285f4]",
  },
  {
    id: 1,
    label: "Marketing",
    value: "Marketing",
    colorCode: "#c755ff",
    bgColor: "bg-[#c755ff]",
  },
  {
    id: 2,
    label: "Design",
    value: "Design",
    colorCode: "#fbbc04",
    bgColor: "bg-[#fbbc04]",
  },
  {
    id: 3,
    label: "Art",
    value: "Art",
    colorCode: "#f57d05",
    bgColor: "bg-[#f57d05]",
  },
  {
    id: 4,
    label: "Community",
    value: "Community",
    colorCode: "#34a853",
    bgColor: "bg-[#34a853]",
  },
  {
    id: 5,
    label: "Writing&Translation",
    value: "Writing&Translation",
    colorCode: "#5b46c6",
    bgColor: "bg-[#5b46c6]",
  },
  {
    id: 6,
    label: "Audio&Video",
    value: "Audio&Video",
    colorCode: "#ff63d6",
    bgColor: "bg-[#ff63d6]",
  },
  {
    id: 7,
    label: "Accounting&Consulting",
    value: "Accounting&Consulting",
    colorCode: "#95d500",
    bgColor: "bg-[#95d500]",
  },
  {
    id: 8,
    label: "Donation&Investment",
    value: "Donation&Investment",
    colorCode: "#ff2c71",
    bgColor: "bg-[#ff2c71]",
  },
  {
    id: 9,
    label: "Legal",
    value: "Legal",
    colorCode: "#fb4432",
    bgColor: "bg-[#fb4432]",
  },
  {
    id: 10,
    label: "Other",
    value: "Other",
    colorCode: "#b7b7b7",
    bgColor: "bg-[#b7b7b7]",
  },
];

export const genreColorStyle: StylesConfig<Genre> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#white",
    borderColor: "light-gray",
    boxShadow: "none",
    ":active": {
      ...styles[":active"],
      borderColor: "#A66497",
    },
    ":hover": {
      ...styles[":hover"],
      borderColor: "#A66497",
    },
    ":focus": {
      ...styles[":focus"],
      borderColor: "#A66497",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    ":active": {
      ...base[":active"],
      color: "#8E477F",
    },
    ":hover": {
      ...base[":hover"],
      color: "#8E477F",
    },
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    const _color = color(data.colorCode);
    return {
      ...styles,
      ...dot(data.colorCode),
      backgroundColor: isSelected
        ? _color.lighten(0.5).hex()
        : isFocused
        ? _color.lighten(0.1).hex()
        : undefined,
      ":active": {
        ...styles[":active"],
        backgroundColor: _color.lighten(0.3).hex(),
      },
      ":hover": {
        ...styles[":hover"],
        backgroundColor: _color.lighten(0.3).hex(),
      },
      fontWeight: "bold",
      color: "#333333",
    };
  },
  input: (styles) => ({ ...styles, fontWeight: "bold" }),
  placeholder: (styles) => ({
    ...styles,
    ...dot("#ccc"),
    fontWeight: "bold",
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.colorCode),
    fontWeight: "bold",
  }),
};

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});
