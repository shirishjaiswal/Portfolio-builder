"use client";

import {
  NavigationSectionContent,
  NavigationSectionContentMap,
  SectionField,
} from "@/components/admin-control/page-navigation/type";
import NavigationTitles from "./navigation-title";
import { useEffect } from "react";
import PageTitle from "@/components/admin-control/page-title/page-title";
import Button from "@/components/Button/button";
import NavigationSections from "./navigation-section";
import localstorage from "@/utils/storage/local-storage";
import { useUSerProfileContextProvider } from "@/context/user-profile-context";
import {
  UserProfile,
  UserProfileData,
  UserProfileSection,
  UserProfileSectionData,
  UserSectionField,
} from "./types";

type ProfileClientProps = {
  navigationSectionContentMap: NavigationSectionContentMap;
};

const generateUserSectionFields = (
  sectionFields: SectionField[],
  sectionKey: number
): UserSectionField[] => {
  const userSectionFields: UserSectionField[] = [];
  sectionFields.forEach((field) => {
    userSectionFields.push({
      key: `${field.key}-${sectionKey}`,
      isVisible: true,
      isRequired: field.isRequired,
      selectionType: field.selectionType,
      label: field.label,
      dropdownSelection: field.dropdownSelection,
      dropdownOptions: field.dropdownOptions,
      dropLinkSelection: [],
      isEndDate: field.endDate,
      isStartDate: field.startDate,
      isOnGoing: field.onGoing,
      startDate: "",
      endDate: "",
      onGoing: false,
      inputValue: [],
    });
  });
  return userSectionFields;
};

const generateUserProfileData = (
  navigationSectionContent: NavigationSectionContent
): UserProfileData => {
  const userProfileData: UserProfileData = {
    isActive: navigationSectionContent.isActive,
    navigationName: navigationSectionContent.navigationName,
    userProfileSectionsData: new Map(),
  } as UserProfileData;

  navigationSectionContent.navigationSection.forEach((section, sectionKey) => {
    const userProfileSectionsSet: UserProfileSectionData =
      {
        key: `${section.sectionName
          .trim()
          .toLowerCase()
          .split(" ")
          .join("-")}-0`,
        sectionName: section.sectionName,
        isMulti: section.isMulti,
        isSectionNameVisible: section.isSectionNameVisible,
        isSectionRequired: section.isRequired,
        userProfileSections: [],
      } as UserProfileSectionData;
    const userProfileSection: UserProfileSection = 
      {
        key: `${section.sectionName
          .trim()
          .toLowerCase()
          .split(" ")
          .join("-")}-0`,
        
        isCollapsed: false,
        sectionFields: generateUserSectionFields(
          section.sectionFields,
          sectionKey
        ),
      } as UserProfileSection;

    userProfileSectionsSet.userProfileSections.push(userProfileSection);

    userProfileData.userProfileSectionsData.set(
      `${section.sectionName.trim().toLowerCase().split(" ").join("-")}`,
      userProfileSectionsSet
    );
  });

  return userProfileData;
};

const generateUserProfile = (
  navigationSectionContentMap: NavigationSectionContentMap
): UserProfile => {
  const userProfile: UserProfile = new Map() as UserProfile;
  navigationSectionContentMap.forEach((value, key) => {
    userProfile.set(key, generateUserProfileData(value));
  });
  return userProfile;
};

const ProfileClient: React.FC<ProfileClientProps> = ({
  navigationSectionContentMap,
}: ProfileClientProps) => {
  const { updateUserProfile } = useUSerProfileContextProvider();

  useEffect(() => {
    updateUserProfile(
      generateUserProfile(
        localstorage.maps.getNavigationSectionContentMap() ??
          navigationSectionContentMap
      )
    );
  }, []);

  return (
    <div>
      <div className="flex-col fixed top-16 pt-4 z-40 bg-white w-full h-24">
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
      <div className="mt-16 w-3/4 ">
        <NavigationSections />
      </div>
    </div>
  );
};
export default ProfileClient;
