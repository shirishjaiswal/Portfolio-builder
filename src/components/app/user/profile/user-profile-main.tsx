"use client";

import { useLoadingContext } from "@/context/loading-context";
import { useEffect } from "react";
import { toast } from "sonner";
import UserProfile from "@/components/app/user/profile/user-profile";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import { generateUserProfileData } from "@/components/app/user/profile/helper";
import loadUserProfileData from "@/utils/api-connections/user/load-user-profile-data";

const UserProfileMain = () => {
  const { updateIsLoading } = useLoadingContext();
  const { updateUserProfileData } = useUserProfileContexts();

  useEffect(() => {
    updateIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await loadUserProfileData();
        if (!response?.data) throw new Error(response?.error);
        updateUserProfileData(generateUserProfileData(response.data.userProfileData));
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        updateIsLoading(false);
      }
    };

    fetchData();
  }, [ updateUserProfileData, updateIsLoading ]);


  return <UserProfile />;
};

export default UserProfileMain;
