import {
  getUniqueFieldKey,
  getUniqueParentKey,
} from "@/components/app/user/profile-configuration/helper";
import {
  UserProfileData,
  UserProfileDetilsGroup,
} from "@/components/app/user/profile/types";
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

  activeTab: UserProfileDetilsGroup | null;

  updateActiveTab: (group: UserProfileDetilsGroup) => void;
  
  updateActiveTabViaGroupKey: (tabKey: string) => void;

  updateParentIsCollapsed: (
    parentUniqueKey: string
  ) => void;

  deleteParent: (groupUniqueKey: string, parentUniqueKey: string) => void;

  duplicateParentSection: (
    groupUniqueKey: string,
    parentUniqueKey: string
  ) => void;

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
  const [userProfileData, setUserProfileData] = useState<UserProfileData>(
    new Map()
  );

  const updateUserProfileData = useCallback(
    (userProfileData: UserProfileData) => {
      setUserProfileData(new Map(userProfileData));
    },
    []
  );

  const [activeTab, setActiveTab] = useState<UserProfileDetilsGroup | null>(
    null
  );



  const updateActiveTabViaGroupKey = useCallback(
    (tabKey: string) => {
      const newUserProfileData = new Map(userProfileData);
      const tabKeyValue = newUserProfileData.get(tabKey);
      if (!tabKeyValue) return;
  
      setActiveTab(tabKeyValue);
    },
    [userProfileData]
  );


  const updateParentIsCollapsed = useCallback(
    (parentUniqueKey: string) => {
      if (!activeTab) return;
  
      const updatedTab = structuredClone(activeTab);
      updatedTab.userInfoParents = updatedTab.userInfoParents.map((userInfoParent) => {
        if (userInfoParent.uniqueKey === parentUniqueKey) {
          return {
            ...userInfoParent,
            isCollapsed: !userInfoParent.isCollapsed,
          };
        }
        return userInfoParent;
      });
  
      setActiveTab(updatedTab);
  
      // const newUserProfileData = new Map(userProfileData);
      // newUserProfileData.set(updatedTab.configKey, updatedTab);
      // updateUserProfileData(newUserProfileData);
    },
    [activeTab]
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
      if (!activeTab) return;
  
      if (activeTab.configKey !== configKey) return;
  
      const updatedActiveTab = structuredClone(activeTab);
      const parent = updatedActiveTab.userInfoParents.find(
        (parent) => parent.uniqueKey === parentUniqueKey
      );
      if (!parent) return;
  
      // Create the duplicated parent with new unique keys
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
  
      // Add the new parent to the activeTab's parents
      updatedActiveTab.userInfoParents = [
        ...updatedActiveTab.userInfoParents,
        newParent,
      ];
  
      // Update the activeTab state
      setActiveTab(updatedActiveTab);
  
      // // Reflect the changes in userProfileData
      // const newUserProfileData = new Map(userProfileData);
      // newUserProfileData.set(updatedActiveTab.configKey, updatedActiveTab);
      // updateUserProfileData(newUserProfileData);
    },
    [activeTab]
  );
  

  const updateActiveTab = useCallback((group: UserProfileDetilsGroup) => {
    setActiveTab(group);
  }, [updateActiveTabViaGroupKey, duplicateParentSection]);

  const value = useMemo(
    () => ({
      userProfileData,
      activeTab,
      updateUserProfileData,
      updateActiveTab,
      updateActiveTabViaGroupKey,
      updateParentIsCollapsed,
      updateTextFieldValue,
      updateInputArrayField,
      updateDateValue,
      deleteParent,
      duplicateParentSection,
    }),
    [
      userProfileData,
      activeTab,
      updateUserProfileData,
      updateActiveTab,
      updateActiveTabViaGroupKey,
      updateParentIsCollapsed,
      updateTextFieldValue,
      updateInputArrayField,
      updateDateValue,
      deleteParent,
      duplicateParentSection,
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
