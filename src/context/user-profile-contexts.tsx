import { getUniqueFieldKey, getUniqueParentKey } from "@/components/app/user/profile-configuration/helper";
import { UserProfileData } from "@/components/app/user/profile/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface UserProfileContextsType {
  userProfileData: UserProfileData;

  updateUserProfileData: (userProfileData: UserProfileData) => void;

  updateParentIsCollapsed: (
    groupUniqueKey: string,
    parentUniqueKey: string
  ) => void;

  deleteParent: (groupUniqueKey: string, parentUniqueKey: string) => void;

  duplicateParentSection: (
    groupUniqueKey: string,
    parentUniqueKey: string
  ) => void;

  updateCurrectActiveTab: (groupUniqueKey: string) => void;

  updateTextFieldValue: (
    groupUniqueKey: string,
    parentUniqueKey: string,
    fieldUniqueKey: string,
    value: string
  ) => void;

  updateInputArrayField: (
    groupUniqueKey: string,
    parentUniqueKey: string,
    fieldUniqueKey: string,
    value: string[]
  ) => void;

  updateDateValue: (
    groupUniqueKey: string,
    parentUniqueKey: string,
    fieldUniqueKey: string,
    type: "startDate" | "endDate",
    value: string | null
  ) => void;
}

const UserProfileContexts = createContext<UserProfileContextsType | undefined>(
  undefined
);

interface UserProfileContextsProps {
  children: React.ReactNode;
}

const UserProfileContextsProvider = ({
  children,
}: UserProfileContextsProps) => {
  const [userProfileData, setUserProfileData] =
    useState<UserProfileData>(new Map());

  const updateUserProfileData = useCallback(
    (userProfileData: UserProfileData) => {
      setUserProfileData(new Map(userProfileData));
    },
    []
  );

  const updateCurrectActiveTab = useCallback(
    (groupUniqueKey: string) => {
      const newUserProfileData = new Map(userProfileData);
      newUserProfileData.forEach((section) => {
        section.isActive = false;
      });
      const currentValue = newUserProfileData.get(groupUniqueKey);
      if (currentValue) {
        currentValue.isActive = true;
        updateUserProfileData(newUserProfileData);
      }
    },
    [userProfileData, updateUserProfileData]
  );

  const updateParentIsCollapsed = useCallback(
    (groupUniqueKey: string, parentUniqueKey: string) => {
      const newUserProfileData = new Map(userProfileData);
      if (newUserProfileData.get(groupUniqueKey)!.isActive === false) return;
      newUserProfileData
        .get(groupUniqueKey)
        ?.userInfoParents.forEach((userInfoParent) => {
          if (userInfoParent.uniqueKey === parentUniqueKey)
            userInfoParent.isCollapsed = !userInfoParent.isCollapsed;
        });
      updateUserProfileData(newUserProfileData);
    },
    [userProfileData, updateUserProfileData]
  );

  const updateTextFieldValue = useCallback(
    (
      groupConfigKey: string,
      parentUniqueKey: string,
      fieldUniqueKey: string,
      value: string
    ) => {
      const newUserProfileData = new Map(userProfileData);
      const group = newUserProfileData.get(groupConfigKey);
      if (group) {
        const parent = group.userInfoParents.find(
          (parent) => parent.uniqueKey === parentUniqueKey
        );
        if (parent) {
          const field = parent.userInfoFields.find(
            (field) => field.uniqueKey === fieldUniqueKey
          );
          if (field && field.value) {
            field.value.inputValue = value;
          }
        }
      }
      updateUserProfileData(newUserProfileData);
    },
    [userProfileData, updateUserProfileData]
  );

  const updateInputArrayField = useCallback(
    (
      groupConfigKey: string,
      parentUniqueKey: string,
      fieldUniqueKey: string,
      value: string[]
    ) => {
      const newUserProfileData = new Map(userProfileData);
      const group = newUserProfileData.get(groupConfigKey);
      if (group) {
        const parent = group.userInfoParents.find(
          (parent) => parent.uniqueKey === parentUniqueKey
        );
        if (parent) {
          const field = parent.userInfoFields.find(
            (field) => field.uniqueKey === fieldUniqueKey
          );
          if (field && field.value) {
            field.value.inputValueArray = value;
          }
        }
      }
      updateUserProfileData(newUserProfileData);
    },
    [userProfileData, updateUserProfileData]
  );

  const updateDateValue = useCallback(
    (
      groupConfigKey: string,
      parentUniqueKey: string,
      fieldUniqueKey: string,
      type: "startDate" | "endDate",
      value: string | null
    ) => {
      const newUserProfileData = new Map(userProfileData);
      const group = newUserProfileData.get(groupConfigKey);
      if (group) {
        const parent = group.userInfoParents.find(
          (parent) => parent.uniqueKey === parentUniqueKey
        );
        if (parent) {
          const field = parent.userInfoFields.find(
            (field) => field.uniqueKey === fieldUniqueKey
          );
          if (field && field.value) {
            field.value[type] = value;
          }
        }
      }
      updateUserProfileData(newUserProfileData);
    },
    [userProfileData, updateUserProfileData]
  );

  const deleteParent = useCallback(
    (configKey: string, parentUniqueKey: string) => {
      const newUserProfileData = new Map(userProfileData);
      const group = newUserProfileData.get(configKey);
      if (group) {
        group.userInfoParents = group.userInfoParents.filter(
          (parent) => parent.uniqueKey !== parentUniqueKey
        );
      }
      updateUserProfileData(newUserProfileData);
    },
    [userProfileData, updateUserProfileData]
  );
  const duplicateParentSection = useCallback(
    (configKey: string, parentUniqueKey: string) => {
      const newUserProfileData = new Map(userProfileData);
  
      const group = newUserProfileData.get(configKey);
      if (!group) return;
  
      const parent = group.userInfoParents.find(
        (parent) => parent.uniqueKey === parentUniqueKey
      );
      if (!parent) return;
  
      const newParent = {
        ...parent,
        uniqueKey: getUniqueParentKey(),
        userInfoFields: parent.userInfoFields.map((field) => ({
          ...field,
          uniqueKey: getUniqueFieldKey(),
          value: {
            ...field.value,
            inputValue: "",
            startDate: null,
            endDate: null,
            inputValueArray: [],
          },
        })),
      };
  
      group.userInfoParents = [...group.userInfoParents, newParent];
  
      updateUserProfileData(newUserProfileData);
    },
    [userProfileData, updateUserProfileData]
  );
  

  const value = useMemo(
    () => ({
      userProfileData,
      updateUserProfileData,
      updateParentIsCollapsed,
      updateCurrectActiveTab,
      updateTextFieldValue,
      updateInputArrayField,
      updateDateValue,
      deleteParent,
      duplicateParentSection
    }),
    [
      userProfileData,
      updateUserProfileData,
      updateParentIsCollapsed,
      updateCurrectActiveTab,
      updateTextFieldValue,
      updateInputArrayField,
      updateDateValue,
      deleteParent,
      duplicateParentSection
    ]
  );

  return (
    <UserProfileContexts.Provider value={value}>
      {children}
    </UserProfileContexts.Provider>
  );
};

const useUserProfileContexts = () => {
  const context = useContext(UserProfileContexts);
  if (!context) {
    throw new Error(
      "useUserProfileContexts must be used within a UserProfileContextsProvider"
    );
  }
  return context;
};

export { UserProfileContextsProvider, useUserProfileContexts };
