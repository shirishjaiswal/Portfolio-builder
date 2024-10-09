"use client";

import SketchPick from "@/components/color-picker/sketch-pick";
import PageTitle from "@/components/admin-control/page-title/page-title";
import { SingleImageDropzone } from "@/components/uploads/single-image-dropzpne";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Button from "@/components/Button/button";
import Loading from "@/components/loading/loading";
import { useLoadingContextProvider } from "@/context/loading-context";

const HeaderStyleClient = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const { isLoading, updateIsLoading } = useLoadingContextProvider();
  useEffect(() => {
    updateIsLoading(false);
  });
  const onSave = async () => {
    if (file) {
      const res = await edgestore.publicImages.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      console.log(res);
    }
  };
  return (
    <>
      <PageTitle title="Header Style" />
      {/* need to addi image url */}
      <div id="content" className="flex-col pb-6">
        <div className="flex justify-left items-baseline pb-4">
          <p className="font-roboto text-sm">Upload Image :</p>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                "image/*": [".png", ".jpg", ".jpeg", ".svg"],
              },
              maxSize: 1 * 1024 * 1024,
            }}
            imageURL={
              "https://files.edgestore.dev/e6m7hbkg5h5avm8r/publicImages/_public/cc2b1e3b-3127-445a-84e0-26037eb04a5c.png"
            }
            alt="logo"
          />
        </div>
        <div className="flex justify-left items-baseline	">
          <p className="font-roboto text-sm">Logo Color :</p>
          <SketchPick />
        </div>
      </div>
      <div className="align-center">
        <Button
          label="Save"
          style="primary"
          isActive={true}
          isDisabled={false}
          type="button"
          onClick={onSave}
          addationalButtonStyles="w-400 h-10"
        />
      </div>
      {isLoading && (
        <Loading
          spinColor="primary"
          spinSize="lg"
          label="Loading..."
          labelColor="primary"
        />
      )}
    </>
  );
};

export default HeaderStyleClient;
