"use client";

import { NavigationSectionContentMap } from "@/components/admin-control/page-navigation/type";
import NavigationTitles from "./navigation-title";
import { useEffect } from "react";
import { useUserNavigationContentContextProvider } from "@/context/user-navigation-content-context";
import PageTitle from "@/components/admin-control/page-title/page-title";
import Button from "@/components/Button/button";

type ProfileClientProps = {
  navigationSectionContentMap: NavigationSectionContentMap;
};
const ProfileClient: React.FC<ProfileClientProps> = ({
  navigationSectionContentMap,
}: ProfileClientProps) => {
  const { updateNavigationSectionContent } =
    useUserNavigationContentContextProvider();

  useEffect(() => {
    updateNavigationSectionContent(navigationSectionContentMap);
  }, []);

  return (
    <div>
      <div className="flex-col fixed top-16 pt-4 z-40 bg-white w-full h-28">
        <PageTitle title="Profile" />
        <NavigationTitles />
        <Button
          label={"Save Changes"}
          style="primary"
          onClick={() => console.log("Clicked+")}
          type="button"
          isActive={false}
          isDisabled={false}
        >
          <p className=" border rounded bg-slate-200 text-slate-600 font-semibold fixed right-52 top-[68px] z-20 p-1 my-4">
            Save Changes
          </p>
        </Button>
      </div>
      
    </div>
  );
};
export default ProfileClient;
