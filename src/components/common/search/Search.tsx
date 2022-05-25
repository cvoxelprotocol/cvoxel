import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchIcon from "@/components/common/search/search.svg";

const defaultPlaceholder = "Search C-Voxel by Wallet address or DID";

type SearchData = {
  address: string;
};

type SearchProps = {
  onSubmit: SubmitHandler<Record<"address", string>>;
  placeholder?: string;
};

export const Search: FC<SearchProps> = ({
  onSubmit,
  placeholder = defaultPlaceholder,
}) => {
  const { register, handleSubmit } = useForm<SearchData>();

  return (
    <form
      className="w-full flex justify-center items-center relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button className="items-center absolute top-4 left-4" type="submit">
        <SearchIcon className="w-4 h-4 ml-2" />
      </button>
      <input
        className="w-full my-1 py-2 pr-6 sm:pl-16 pl-12 border rounded-full border-gray-500 placeholder:text-gray-500 text-sm md:text-sm hover:outline-secondary focus:outline-secondary"
        placeholder={placeholder}
        type="search"
        {...register("address", {
          required: "Please enter DID or ethereum address",
        })}
      />
    </form>
  );
};
