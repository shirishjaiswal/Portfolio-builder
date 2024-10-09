"use client";

import { useEffect } from "react";
import { Input } from "@nextui-org/input";
import PageTitle from "@/components/admin-control/page-title/page-title";
import Button from "@/components/Button/button";
import Loading from "@/components/loading/loading";
import { useLoadingContextProvider } from "@/context/loading-context";
import CreatableSelect from "react-select/creatable";
import { styleForTags } from "../page-navigation/styles";

const ProfilePageClient: React.FC = () => {

  const { isLoading, updateIsLoading } = useLoadingContextProvider();

  useEffect(() => {
    updateIsLoading(false);
  });

  return (
    <div className="flex-col w-full">
      <PageTitle title="Profile Page" />
      <div className="w-44p">
        <Input
          className="w-26p pb-4 text-roboto text-sm"
          key="page-title"
          type="text"
          label="Page Title"
          labelPlacement="outside"
          placeholder="Enter Page Title"
          defaultValue=""
          variant="underlined"
          isInvalid={false}
          errorMessage="Please enter a valid email"
        />
        <div className="flex-col pb-4">
          <p className="font-roboto text-sm">Add Options</p>
          <CreatableSelect
            isMulti
            placeholder="Options List"
            className="text-roboto text-sm"
            key="selection-type"
            styles={styleForTags}
          />
          <div className="solid h-0.5 bg-slate-300"></div>
        </div>
      </div>
      <div className="align-center">
        <Button
          label="Save"
          style="primary"
          isDisabled={false}
          isActive={false}
          type="button"
          onClick={() => {}}
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
    </div>
  );
};

export default ProfilePageClient;
