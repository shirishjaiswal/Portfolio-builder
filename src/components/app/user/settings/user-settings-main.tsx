"use client";

import { useLoadingContext } from "@/context/loading-context";
import {
  UserDetailsType,
  useUserSettingsContext,
} from "@/context/user-settings-context";
import { get } from "lodash";
import { useEffect } from "react";
import { toast } from "sonner";
import UserSettings from "@/components/app/user/settings/user-settings";
import { userSettingsTab } from "@/components/app/user/settings/user-settings-tab";
import getUserDetails from "@/utils/api-connections/user-details/get";

const UserSettingsMain: React.FC = () => {
  const { updateIsLoading } = useLoadingContext();
  const { updateUserDetails, updateActiveSettingsTab } =
    useUserSettingsContext();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        updateIsLoading(true);
        const userDetails = await getUserDetails();

        if (!userDetails?.data) throw new Error(userDetails?.error);
        if (userDetails?.data) {
          const userAccountSettings: UserDetailsType = {
            id: get(userDetails?.data, "id"),
            firstName: get(userDetails?.data, "firstName"),
            lastName: get(userDetails?.data, "lastName"),
            roles: get(userDetails?.data, "role"),
            email: get(userDetails?.data, "email"),
            phoneNumber: get(userDetails?.data, "mobile"),
            status: get(userDetails?.data, "status"),
            emailVerified: get(userDetails?.data, "emailVerified"),
            phoneVerified: get(userDetails?.data, "phoneVerified"),
          };
          updateUserDetails(userAccountSettings);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        updateIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    updateActiveSettingsTab(userSettingsTab[0]);
  }, []);
  return <UserSettings />;
};

export default UserSettingsMain;
