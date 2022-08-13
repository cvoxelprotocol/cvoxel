import { FC, useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useFileUpload } from "@/hooks/useFileUpload";
import { CommonSpinner } from "../common/CommonSpinner";
import FilePlus from "@/components/Transaction/file-plus.svg";

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
              {isDragActive ? (
                <FontAwesomeIcon icon={faCloudUploadAlt} />
              ) : (
                <div className="flex flex-col justify-center items-center space-y-2">
                  <FilePlus />
                  <span className="font-medium block text-light-on-secondary-container dark:text-dark-on-secondary-container">
                    Add files as deliverbles
                  </span>
                </div>
              )}
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
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          size={"2x"}
                          className="block w-auto h-full mx-auto justify-center items-center text-center"
                        />
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
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
              </svg>
              <span>Upload</span>
            </button>
          )}
        </>
      )}
    </>
  );
};
