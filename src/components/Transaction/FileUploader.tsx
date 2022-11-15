import { FC, useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { useFileUpload } from "@/hooks/useFileUpload";
import { CommonSpinner } from "../common/CommonSpinner";
import FilePlus from "@/components/Transaction/file-plus.svg";
import File from "@/components/common/button/file.svg";

const MAX_SIZE = 5242880;

type FileWithPreview = {
  file: File;
  preview: string;
};

export const FileUploader: FC = () => {
  const { upload, status } = useFileUpload();
  const [files, setFiles] = useState<FileWithPreview[] | null>();
  const [errors, setErrors] = useState("");

  useEffect(
    () => () => {
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === "file-too-large") {
              setErrors(`Error: File size must be less than 5 MB`);
            }

            setErrors(`Error: ${err.message}`);
          });
        });
        setFiles(null);
      } else {
        setFiles(
          acceptedFiles.map((f) =>
            Object.assign({}, { file: f, preview: URL.createObjectURL(f) })
          )
        );
        setErrors("");
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_SIZE,
  });

  const handleUpload = async () => {
    if (!files) return;
    await upload(files.map((f) => f.file));
    if (status === "completed") {
      setFiles(null);
    }
  };

  return (
    <>
      {status !== "completed" && (
        <>
          <div className="border-2 bg-light-surface-4 dark:bg-dark-surface-4 border-dashed border-light-secondary dark:border-dark-secondary rounded-xl">
            <div
              className="w-full h-32 rounded flex justify-center items-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col justify-center items-center space-y-2">
                  <FilePlus />
                  <span className="font-medium block text-light-on-secondary-container dark:text-dark-on-secondary-container">
                    Add files as deliverbles
                  </span>
                </div>
            </div>
          </div>
          {errors && <p className="text-xs text-red-600">{errors}</p>}
        </>
      )}
      {files && (
        <>
          <div className="w-full flex flex-wrap my-4 justify-center items-center text-center">
            {files.map((file) => {
              return (
                <div key={file.file.name} className="text-center">
                  <div className="overflow-hidden border border-gray-100 rounded-lg w-1/4 h-auto md:w-32 md:h-32 p-1 m-1 mx-auto">
                    <div className="flex min-w-0">
                      {file.file.type.indexOf("image") != -1 ? (
                        <img
                          src={file.preview}
                          className="block w-auto h-full"
                        />
                      ) : (
                        <File className="block w-full h-auto mx-auto justify-center items-center text-center text-light-on-surface-variant dark:text-dark-on-surface-variant" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs">{file.file.name}</p>
                </div>
              );
            })}
          </div>
          {status === "uploading" && (
            <div className="flex w-full items-center justify-center space-x-2">
              <CommonSpinner />
              <span>Uploading for IPFS and Getting CID...</span>
            </div>
          )}
          {status !== "uploading" && status !== "completed" && (
            <button
              type="button"
              onClick={() => handleUpload()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-2"
            >
              <span>Upload</span>
            </button>
          )}
        </>
      )}
    </>
  );
};
