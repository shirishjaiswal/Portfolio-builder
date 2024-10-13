import {
  NavigationSectionContent,
  NavigationSectionContentMap,
} from "@/components/admin-control/page-navigation/type";
import {
  SerializeUserProfile,
  UserProfile,
  UserProfileSectionData,
} from "@/components/user/profile/types";

const navigationSectionContentMap = (
  data: string
): NavigationSectionContentMap => {
  const deserialized: NavigationSectionContentMap = new Map();

  const d: { key: string; value: NavigationSectionContent }[] =
    JSON.parse(data);
  if (!d) return deserialized;
  console.log(typeof d);
  d.forEach((section: { key: string; value: NavigationSectionContent }) => {
    deserialized.set(section.key, section.value);
  });

  return deserialized;
};

const userProfile = (data: string): UserProfile => {
  const deserialized: SerializeUserProfile[] = JSON.parse(data);
  const userProfile: UserProfile = new Map();

  const deserialize = (
    data: {
      key: string;
      value: UserProfileSectionData;
    }[]
  ) => {
    const userProfileSectionsData: Map<string, UserProfileSectionData> =
      new Map() as Map<string, UserProfileSectionData>;
    data.forEach((section) => {
      userProfileSectionsData.set(section.key, section.value);
    });
    return userProfileSectionsData;
  };
  deserialized.forEach((userProfileData) => {
    userProfile.set(userProfileData.key, {
      isActive: userProfileData.userProfileData.isActive,
      navigationName: userProfileData.userProfileData.navigationName,
      userProfileSectionsData: deserialize(
        userProfileData.userProfileData.userProfileSectionsData
      ),
    });
  });
  return userProfile;
};

const Deserialize = {
  navigationSectionContentMap,
  userProfile,
};

export default Deserialize;
