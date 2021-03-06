import { useInternalTransactions } from "@/hooks/useInternalTransactions";
import { CVoxel, TransactionLogWithChainId } from "@/interfaces";
import { FC, useMemo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../common/button/Button";
import { CommonSpinner } from "../common/CommonSpinner";
import { GenreList } from "./GenreList";
import { InternalTransactionContainer } from "./InternalTransactionContainer";
import { TagForm } from "./TagForm";

type TransactionFormProps = {
  tx: TransactionLogWithChainId;
  connectionStatus: "disconnected" | "connecting" | "failed" | "connected";
  isFirstTime?: boolean;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  tx,
  connectionStatus,
  isFirstTime,
}) => {
  const { internalTxs, internalTxLoading } = useInternalTransactions(tx);

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CVoxel>();

  const relatedAddress = useMemo(() => {
    let merged: string[] | null = tx.addressOfDuplicatedTx || null;
    if (!internalTxs || internalTxs.length === 0) return merged;
    const to = internalTxs.map((tx) => tx.to.toLowerCase());
    const from = internalTxs.map((tx) => tx.from.toLowerCase());
    return merged ? merged.concat(from).concat(to) : from.concat(to);
  }, [internalTxs, tx]);

  const summaryPlaceHolder = useMemo(() => {
    return isFirstTime
      ? "Enter a summary... (e.g.Bitcoin Development)"
      : "Enter a summary...";
  }, [isFirstTime]);

  const descPlaceHolder = useMemo(() => {
    return isFirstTime
      ? "Write your description here... (e.g.My name is Satoshi Nakamoto and I authored the papaer and developed Bitcoin.)"
      : "Write your description here...";
  }, [isFirstTime]);

  useEffect(() => {
    if (relatedAddress && relatedAddress.length > 0) {
      setValue("relatedAddresses", relatedAddress);
    }
    register("genre", { required: "Please select genre" });
  }, [relatedAddress, tx]);

  return (
    <>
      {/* title */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">
          Activity Summary
          {errors && errors.summary && (
            <span className="cols-span-1 px-3 text-xs text-red-600">
              {errors.summary.message}
            </span>
          )}
        </p>
      </div>
      <div className="mb-3">
        <input
          className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary"
          placeholder={summaryPlaceHolder}
          {...register("summary", { required: "Please enter a summary" })}
        />
      </div>

      {/* detail */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Description(optional)</p>
      </div>
      <div className="mb-3">
        <textarea
          className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm hover:border-primary focus:outline-primary"
          rows={3}
          placeholder={descPlaceHolder}
          {...register("detail")}
        />
        <div className="w-full grid grid-cols-2 mb-2">
          <span className="cols-span-1 px-3 text-xs text-red-600">
            {errors.detail?.message}
          </span>
        </div>
      </div>
      {/* GenreList */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">
          Genre
          {errors && errors.genre && (
            <span className="cols-span-1 px-3 text-xs text-red-600">
              {errors.genre.message}
            </span>
          )}
        </p>
      </div>
      <div className="mb-3 w-full text-left">
        <GenreList
          handleGenre={(g) =>
            setValue("genre", g.value, { shouldValidate: true })
          }
          genre={getValues("genre")}
        />
      </div>
      {/* tags */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Tags(optional)</p>
      </div>
      <div className="mb-3 w-full text-left">
        <TagForm
          handleTags={(tags) => setValue("tags", tags)}
          tags={getValues("tags")}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Deliverable link(optional)</p>
      </div>
      <div className="mb-3">
        <input
          className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary"
          placeholder={"Enter Deliverable link.."}
          {...register("deliverable")}
        />
        <div className="w-full grid grid-cols-2 mb-2">
          <span className="cols-span-1 px-3 text-xs text-red-600">
            {errors.deliverable?.message}
          </span>
        </div>
      </div>
      <div className="text-right py-4 space-x-4 flex justify-end items-center">
        {connectionStatus === "connecting" && <CommonSpinner />}
        <Button
          text={
            connectionStatus === "connected"
              ? "Create"
              : connectionStatus === "connecting"
              ? "Connecitng..."
              : "Connect DID for Create"
          }
          buttonType={"submit"}
          color={connectionStatus === "connected" ? "grad-blue" : "grad-red"}
        />
      </div>
      <InternalTransactionContainer
        tx={tx}
        internalTxs={internalTxs}
        internalTxLoading={internalTxLoading}
      />
    </>
  );
};
