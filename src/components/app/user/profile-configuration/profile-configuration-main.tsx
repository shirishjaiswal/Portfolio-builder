"use client";

import { useLoadingContextProvider } from "@/context/loading-context";
import getUserInfoGroup from "@/utils/api-connections/admin/get-user-info-group";
import userDetailsFieldInputType from "@/utils/api-connections/admin/user-details-field-input-type";
import { useEffect } from "react";
import { toast } from "sonner";
import ProfileConfiguration from "./profile-configuration";
import { getReactSelectOptions } from "@/utils/helper/user-info-group";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { getProfileConfigurationSection } from "./helpet";

const ProfileConfigurationMain = () => {
  const { updateIsLoading } = useLoadingContextProvider();
  const { updateFieldInputOptions, updateProfileConfigurationData } =
    useProfileConfigurationContextProvider();

  useEffect(() => {
    const fetchData = async () => {
      updateIsLoading(true);
      try {
        const fieldDataResponse = await userDetailsFieldInputType();
        if (fieldDataResponse?.data)
          updateFieldInputOptions(
            getReactSelectOptions(fieldDataResponse?.data)
          );
        const profileConfigurationResponse = await getUserInfoGroup();
        updateProfileConfigurationData(
          getProfileConfigurationSection(profileConfigurationResponse?.data)
        );
      } catch (error) {
        toast.error("An unexpected error occurred");
      } finally {
        updateIsLoading(false);
      }
    };

    fetchData();
  }, [updateProfileConfigurationData, updateFieldInputOptions, updateIsLoading]);

  return <ProfileConfiguration />;
};

export default ProfileConfigurationMain;
