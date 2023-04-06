import React, { Dispatch, DragEvent, SetStateAction } from "react";
import { Upload } from "@icons/Upload";
import { UploadImageInput } from "@components/upload-image/UploadImageInput";

interface DragAndDropFileProps {
  setImages: Dispatch<SetStateAction<File[]>>;
}

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export const DragAndDropFile = ({ setImages }: DragAndDropFileProps) => {
  const baseParagraphClasses = "p-2 uppercase text-accent-content";

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      const filesList = Array.from(e.dataTransfer.files).filter(
          (file) =>
              allowedTypes.includes(file.type) && file.size < 1000 * 1000 * 4.9
      );
      setImages((prevState) => [...prevState, ...filesList]);
    }
  };

  return (
      <div className="my-8 w-1/2 bg-accent p-2 hover:bg-accent-focus">
        <div
            className="flex w-full flex-col items-center border-2 border-dashed border-accent-content p-12"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
          <Upload className="w-1/6" />
          <p className={baseParagraphClasses}>Drag & Drop File</p>
          <p className={baseParagraphClasses}>OR</p>
          <UploadImageInput setImages={setImages} />
          <p className={baseParagraphClasses}>
            Allowed types:{" "}
            <strong className="font-bold">{allowedTypes.join(" ")}</strong>
          </p>
          <p className={baseParagraphClasses}>
            Max size: <strong className="font-bold">4.5 MB</strong>
          </p>
        </div>
      </div>
  );
};
