import { useDraftCVoxel } from "@/hooks/useDraftCVoxel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useInternalTransactions } from "@/hooks/useInternalTransactions";
import { WorkCredentialForm, TransactionLogWithChainId } from "@/interfaces";
import { ViewerConnectionState } from "@self.id/react";
import { FC, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../common/button/Button";
import { CommonSpinner } from "../common/CommonSpinner";
import { FileUploader } from "./FileUploader";
import { GenreList } from "./GenreList";
import { InternalTransactionContainer } from "./InternalTransactionContainer";
import { TagForm } from "./TagForm";

type TransactionFormProps = {
  tx: TransactionLogWithChainId;
  connectionState: ViewerConnectionState;
  onSubmit: (data: any) => void;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  tx,
  connectionState,
  onSubmit,
}) => {
  const { internalTxs, internalTxLoading } = useInternalTransactions(tx);
  const { cid, status } = useFileUpload();
  const { issueStatus } = useDraftCVoxel();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkCredentialForm>();

  const onClickSubmit = (data: any) => {
    if (!data) return;
    onSubmit(data);
  };

  useEffect(() => {
    if (issueStatus === "completed") {
      reset();
    }
  }, [issueStatus, reset]);

  const relatedAddress = useMemo(() => {
    let merged: string[] | null = tx.addressOfDuplicatedTx || null;
    if (!internalTxs || internalTxs.length === 0) return merged;
    const to = internalTxs.map((tx) => tx.to.toLowerCase());
    const from = internalTxs.map((tx) => tx.from.toLowerCase());
    return merged ? merged.concat(from).concat(to) : from.concat(to);
  }, [internalTxs, tx]);

  useEffect(() => {
    if (relatedAddress && relatedAddress.length > 0) {
      setValue("relatedAddresses", relatedAddress);
    }
    register("genre", { required: "Please select genre" });
  }, [relatedAddress, tx]);

  useEffect(() => {
    if (status === "completed" && cid) {
      setValue("deliverableCID", cid);
    }
  }, [cid, status]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onClickSubmit)}>
      {/* title */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">
          Activity Summary
          <span className="cols-span-1 px-3 text-xs text-red-600">
            {errors.summary?.message}
          </span>
        </p>
      </div>
      <div className="mb-3">
        <input
          className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
          placeholder={"Enter a summary..."}
          {...register("summary", { required: "Please enter a summary" })}
        />
      </div>

      {/* detail */}
      <div className="flex flex-wrap items-center">
        <p className="font-semibold">Description(optional)</p>
      </div>
      <div className="mb-3">
        <textarea
          className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
          rows={3}
          placeholder={"Write your description here..."}
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
        <p className="font-semibold">Deliverables(optional)</p>
      </div>
      <div className="mb-3">
        <input
          className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary bg-light-surface-variant dark:bg-dark-surface-variant"
          placeholder={"Enter Deliverable link.."}
          {...register("deliverableLink")}
        />
      </div>
      {/*<div className="flex flex-wrap items-center">*/}
      {/*  <p className="font-semibold">Deliverable CID(optional)</p>*/}
      {/*</div>*/}
      <div className="mb-3">
        {cid && (
          <p className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm hover:border-primary focus:outline-primary text-left">
            {cid}
          </p>
        )}
        <FileUploader />
        <div className="w-full grid grid-cols-2 mb-2">
          {errors && errors.deliverableLink && (
            <span className="cols-span-1 px-3 text-xs text-red-600">
              {errors.deliverableLink.message}
            </span>
          )}
          {errors && errors.deliverableCID && (
            <span className="cols-span-1 px-3 text-xs text-red-600">
              {errors.deliverableCID.message}
            </span>
          )}
        </div>
      </div>
      <div className="text-right py-4 space-x-4 flex justify-end items-center">
        {connectionState.status === "connecting" && <CommonSpinner />}
        <Button
          text={
            connectionState.status === "connected"
              ? "Create"
              : connectionState.status === "connecting"
              ? "Connecitng..."
              : "Connect DID for Create"
          }
          buttonType={"submit"}
          color={
            connectionState.status === "connected" ? "primary" : "secondary"
          }
        />
      </div>
      <InternalTransactionContainer
        tx={tx}
        internalTxs={internalTxs}
        internalTxLoading={internalTxLoading}
      />
    </form>
  );
};
