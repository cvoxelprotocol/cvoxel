import { FC, FormEventHandler, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchIcon from "@/components/common/search/search.svg";

const defaultPlaceholder = "Search C-Voxel by Wallet address or DID";

export type SearchData = {
  value: string;
};

type SearchProps = {
  onSubmit: SubmitHandler<SearchData>;
  placeholder?: string;
  onClear?: () => void;
};

export const Search: FC<SearchProps> = ({
  onSubmit,
  placeholder = defaultPlaceholder,
  onClear,
}) => {
  const { register, handleSubmit } = useForm<SearchData>();

  const handleClear: FormEventHandler<HTMLInputElement> = (event) => {
    if (onClear && (event.target as HTMLInputElement).value == "") {
      onClear();
    }
  };

  return (
    <form
      className="w-full flex justify-center items-center relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button className="items-center absolute top-4 left-4" type="submit">
        <SearchIcon className="w-4 h-4 ml-2 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
      </button>
      <input
        className="w-full my-1 py-2 pr-6 sm:pl-16 pl-12 border rounded-full text-sm md:text-sm hover:outline-secondary focus:outline-secondary bg-light-surface-variant dark:bg-dark-surface-variant placeholder:text-light-on-surface-variant dark:placeholder:text-dark-on-surface-variant"
        placeholder={placeholder}
        type="search"
        {...register("value", {
          required: "Please enter DID or ethereum address",
        })}
        onInput={handleClear}
      />
    </form>
  );
};
