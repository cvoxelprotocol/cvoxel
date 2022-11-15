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

export const IconUploader: FC = () => {
  const { uploadIcon, status } = useFileUpload();
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
        uploadIcon(acceptedFiles[0])
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

  return (
    <>
        <div className="border-2 bg-light-surface-4 dark:bg-dark-surface-4 border-dashed border-light-secondary dark:border-dark-secondary rounded-xl">
          <div
            className="relative w-full h-32 rounded flex justify-center items-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {files ? (
                <>
                  <div className="absolute top-0 bottom-0 right-0 left-0 w-full flex flex-wrap justify-center items-center text-center">
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
                        </div>
                      );
                    })}
                  </div>
                  {status === "uploading" && (
                    <div className="absolute top-0 bottom-0 right-0 left-0">
                      <div className="flex w-full h-full items-center justify-center bg-black opacity-40">
                        <CommonSpinner />
                      </div>
                    </div>
                  )}
                </>
              ): (
                <div className="flex flex-col justify-center items-center space-y-2">
                  <FilePlus />
                  <span className="font-medium block text-light-on-secondary-container dark:text-dark-on-secondary-container">
                    Add Icon
                  </span>
                </div>
              )}
          </div>
        </div>
        {errors && <p className="text-xs text-red-600">{errors}</p>}
      </>
  );
};
