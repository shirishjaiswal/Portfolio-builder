"use client";

import { useLoadingContext } from "@/context/loading-context";
import { useEffect } from "react";
import { toast } from "sonner";
import UserProfile from "@/components/app/user/profile/user-profile";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import { generateUserProfileData } from "@/components/app/user/profile/helper";
import loadUserProfileData from "@/utils/api-connections/user-details/load-user-profile-data";

const UserProfileMain = () => {
  const { updateIsLoading } = useLoadingContext();
  const { updateUserProfileData } = useUserProfileContexts();

  useEffect(() => {
    updateIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await loadUserProfileData();
        if (!response?.data) throw new Error(response?.error);
        updateUserProfileData(
          generateUserProfileData(response.data.userProfileData)
        );

        console.log(generateUserProfileData(response.data.userProfileData));
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        updateIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center bg-gradient-to-br h-92p">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <span className="text-7xl animate-pulse mb-6">💻</span>
        <p className="text-4xl font-extrabold text-gray-900 tracking-wide">
          Work in Progress
        </p>
        <p className="mt-4 text-lg text-gray-500 max-w-md mx-auto">
          We are crafting something amazing for you. Please stay tuned for
          updates!
        </p>
      </div>
    </div>
  );
};

export default UserProfileMain;
