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
  data: NavigationSectionContentMap
): { key: string; value: NavigationSectionContent }[] => {
  const serialize: { key: string; value: NavigationSectionContent }[] = [];

  data.forEach((value, key) => {
    serialize.push({ key: key, value: value });
  });

  return serialize;
};

const userProfile = (data: UserProfile) => {
  const serialize: SerializeUserProfile[] = [];

  const serializeUserProfileSectionsData = (
    value: Map<string, UserProfileSectionData>
  ) => {
    const serialize: { key: string; value: UserProfileSectionData }[] = [];
    value.forEach((value, key) => serialize.push({ key: key, value: value }));
    return serialize;
  };
  data.forEach((value, key) => {
    serialize.push({
      key: key,
      userProfileData: {
        isActive: value.isActive,
        navigationName: value.navigationName,
        userProfileSectionsData: serializeUserProfileSectionsData(
          value.userProfileSectionsData
        ),
      },
    });
  });

  return serialize;
};

const Serialize = {
  navigationSectionContentMap,
  userProfile,
};

export default Serialize;
