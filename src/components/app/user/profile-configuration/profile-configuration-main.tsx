"use client";

import { useLoadingContext } from "@/context/loading-context";
import getUserInfoGroup from "@/utils/api-connections/user-info/group/get";
import userInfoFieldType from "@/utils/api-connections/user-info/field-type/get";
import { useEffect } from "react";
import { toast } from "sonner";
import ProfileConfiguration from "@/components/app/user/profile-configuration/profile-configuration";
import { getReactSelectOptions } from "@/utils/helper/user-info-group";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { getProfileConfigurationSection } from "@/components/app/user/profile-configuration/helper";

const ProfileConfigurationMain = () => {
  const { updateIsLoading } = useLoadingContext();
  const { updateFieldInputOptions, updateProfileConfigurationData } =
    useProfileConfigurationContextProvider();

  useEffect(() => {
    const fetchData = async () => {
      updateIsLoading(true);
      try {
        const fieldDataResponse = await userInfoFieldType();
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
  }, []);

  return <ProfileConfiguration />;
};

export default ProfileConfigurationMain;
