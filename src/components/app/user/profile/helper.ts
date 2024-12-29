import { addHyphen, getUniqueKey } from "../profile-configuration/helper";
import {
  UserProfileData,
  UserProfileDetilsGroup,
} from "@/components/app/user/profile/types";

export const getUniqueGroupKey = (key?: string) => {
  return `profile-group-${getUniqueKey()}${addHyphen(key)}`;
};

export const getUniqueParentKey = (key?: string) => {
  return `profile-parent-${getUniqueKey()}${addHyphen(key)}`;
};

export const getUniqueFieldKey = (key?: string) => {
  return `profile-field-${getUniqueKey()}${addHyphen(key)}`;
};

export const generateUserProfileData = (userInfoGroupOP: UserProfileDetilsGroup[]) => {
  const userProfileData: UserProfileData = new Map();
  userInfoGroupOP.forEach((userInfoGroup: UserProfileDetilsGroup) => {
    userProfileData.set(userInfoGroup.configKey, userInfoGroup);
  });
  return userProfileData;
};

export const getActiveTab = (
  userProfileData: UserProfileData
): UserProfileDetilsGroup | undefined => {
  let activeTabKey: string = "";
  userProfileData.forEach(
    (userInfoGroup: UserProfileDetilsGroup, key: string) => {
      if (userInfoGroup.isActive) {
        activeTabKey = key;
      }
    }
  );
  return userProfileData.get(activeTabKey);
};
