"use client";

import {
  getActiveTab,
  getUniqueFieldKey,
  getUniqueParentKey,
} from "@/components/app/user/profile-configuration/helper";
import {
  ParentSection,
  ProfileConfigurationSection,
  UserInfoField_OP,
  UserInfoGroup_OP,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";
import { ReactSelectOption } from "@/utils/types/react-select";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface ProfileConfigurtionContextType {
  unsavedChanges: Map<
    string,
    Map<
      string,
      { parentHasUnsavedChanges: boolean; field: Map<string, boolean> }
    >
  >;
  updateUnsavedChanges: (
    hasUnsavedChanges: boolean,
    groupUniqueKey: string,
    parentUniqueKey: string,
    fieldUniqueKey?: string
  ) => void;

  fieldInputOptions: ReactSelectOption[];
  updateFieldInputOptions: (fieldInputOptions: ReactSelectOption[]) => void;

  profileConfigurationData: ProfileConfigurationSection;
  updateProfileConfigurationData: (
    profileConfigurationData: ProfileConfigurationSection
  ) => void;

  updateCurrectActiveTab: (key: string) => void;

  removeProfileConfigurationTab: (key: string) => void;

  addNewProfileConfigurationTab: (userInfoGroup: UserInfoGroup_OP) => void;

  updateProfileConfigurationTabLable: (key: string, lable: string) => void;

  updateParentInEditMode: (groupkey: string, parentKey: string) => void;

  updateParentIsCollapsed: (groupkey: string, sectionKey: string) => void;

  updateParentSection: (
    groupkey: string,
    sectionKey: string,
    dataToUpdate: ParentSection
  ) => void;

  deleteParent: (groupkey: string, parentKey: string) => void;

  deleteField: (groupkey: string, parentKey: string, fieldKey: string) => void;

  addNewTextField: (
    groupkey: string,
    parentKey: string,
    userInfoField: UserInfoField_OP
  ) => void;

  updateFieldSection: (
    groupkey: string,
    parentKey: string,
    field: UserInfoField_OP
  ) => void;

  addNewParentSection: (
    groupkey: string,
    userInfoParent: UserInfoParent_OP
  ) => void;

  duplicateParentSection: (groupkey: string, parentKey: string) => void;

  duplicateFieldSection: (
    groupkey: string,
    parentKey: string,
    fieldKey: string
  ) => void;
}

const ProfileConfigurationContext = createContext<
  ProfileConfigurtionContextType | undefined
>(undefined);

interface ProfileConfigurationContextProps {
  children: ReactNode;
}

const ProfileConfigurationContextProvider = ({
  children,
}: ProfileConfigurationContextProps) => {
  const [fieldInputOptions, setFieldInputOptions] = useState<
    ReactSelectOption[]
  >([]);

  const [profileConfigurationData, setProfileConfigurationData] =
    useState<ProfileConfigurationSection>(new Map());

  const [unsavedChanges, setUnsavedChanges] = useState<
    Map<
      string,
      {
        hasUnsavedChanges: boolean;
        parent: Map<
          string,
          { hasUnsavedChanges: boolean; field: Map<string, boolean> }
        >;
      }
    >
  >(new Map());

  const updateUnsavedChanges = useCallback(
    (
      hasUnsavedChanges: boolean,
      groupUniqueKey: string,
      parentUniqueKey?: string,
      fieldUniqueKey?: string
    ) => {
      
    },
    [setUnsavedChanges]
  );

  const updateFieldInputOptions = useCallback(
    (fieldInputOptions: ReactSelectOption[]) => {
      setFieldInputOptions(fieldInputOptions);
    },
    []
  );

  const updateProfileConfigurationData = useCallback(
    (profileConfigurationData: ProfileConfigurationSection) => {
      setProfileConfigurationData(new Map(profileConfigurationData));
    },
    []
  );

  const updateCurrectActiveTab = useCallback(
    (groupUniqueKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      newProfileConfigurationData.forEach((section) => {
        section.isActive = false;
      });
      const currentValue = newProfileConfigurationData.get(groupUniqueKey);
      if (currentValue) {
        currentValue.isActive = true;
        updateProfileConfigurationData(newProfileConfigurationData);
      }
      if (
        getActiveTab(profileConfigurationData)?.configKey === groupUniqueKey
      ) {
        setUnsavedChanges(() => {
          const newUnsavedChanges = new Map();
          return newUnsavedChanges;
        });
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const removeProfileConfigurationTab = useCallback(
    (key: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      newProfileConfigurationData.delete(key);
      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const addNewProfileConfigurationTab = useCallback(
    (userInfoGroup: UserInfoGroup_OP) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);

      newProfileConfigurationData.forEach((group) => {
        group.isActive = false;
      });

      newProfileConfigurationData.set(userInfoGroup.configKey, {
        id: userInfoGroup.id,
        configKey: userInfoGroup.configKey,
        description: userInfoGroup.description,
        position: userInfoGroup.position,
        label: userInfoGroup.label,
        visible: userInfoGroup.visible,
        userInfoParents: userInfoGroup.userInfoParents,
        isActive: true,
      });

      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const updateProfileConfigurationTabLable = useCallback(
    (key: string, lable: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      newProfileConfigurationData.get(key)!.label = lable;
      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const updateParentInEditMode = useCallback(
    (groupkey: string, parentKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      if (newProfileConfigurationData.get(groupkey)!.isActive === false) return;
      newProfileConfigurationData
        .get(groupkey)
        ?.userInfoParents.forEach((userInfoParent) => {
          if (userInfoParent.configKey === parentKey) {
            userInfoParent.inEditMode = userInfoParent.inEditMode
              ? false
              : true;
            userInfoParent.isCollapsed = userInfoParent.inEditMode
              ? true
              : false;
          }
        });
      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const updateParentIsCollapsed = useCallback(
    (groupkey: string, sectionKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      if (newProfileConfigurationData.get(groupkey)!.isActive === false) return;
      newProfileConfigurationData
        .get(groupkey)
        ?.userInfoParents.forEach((userInfoParent) => {
          if (userInfoParent.configKey === sectionKey)
            userInfoParent.isCollapsed = !userInfoParent.isCollapsed;
        });
      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const updateParentSection = useCallback(
    (groupkey: string, sectionKey: string, dataToUpdate: ParentSection) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      newProfileConfigurationData
        .get(groupkey)
        ?.userInfoParents.forEach((userInfoParent) => {
          if (userInfoParent.configKey === sectionKey && dataToUpdate) {
            if (dataToUpdate.label !== "")
              userInfoParent.label = dataToUpdate.label;
            userInfoParent.description = dataToUpdate.description;
            userInfoParent.required = dataToUpdate.required;
            userInfoParent.multi = dataToUpdate.multi;
            userInfoParent.label = dataToUpdate.label;
            userInfoParent.labelVisible = dataToUpdate.labelVisible;
            userInfoParent.inEditMode = false;
          }
        });
      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const deleteParent = useCallback(
    (groupKey: string, parentKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);

      const group = newProfileConfigurationData.get(groupKey);

      if (group) {
        const updatedParents = group.userInfoParents.filter(
          (parent) => parent.configKey !== parentKey
        );

        group.userInfoParents = updatedParents;

        newProfileConfigurationData.set(groupKey, group);

        updateProfileConfigurationData(newProfileConfigurationData);
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const deleteField = useCallback(
    (groupKey: string, parentKey: string, fieldKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      const group = newProfileConfigurationData.get(groupKey);

      if (group) {
        const updatedParents = group.userInfoParents.map((parent) => {
          if (parent.configKey === parentKey) {
            return {
              ...parent,
              userInfoFields: parent.userInfoFields.filter(
                (field) => field.configKey !== fieldKey
              ),
            };
          }
          return parent;
        });

        group.userInfoParents = updatedParents;
        newProfileConfigurationData.set(groupKey, group);
        updateProfileConfigurationData(newProfileConfigurationData);
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const addNewTextField = useCallback(
    (groupKey: string, parentKey: string, userInfoField: UserInfoField_OP) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      const group = newProfileConfigurationData.get(groupKey);

      if (group) {
        const updatedParents: UserInfoParent_OP[] = group.userInfoParents.map(
          (parent) => {
            if (parent.configKey === parentKey) {
              return {
                ...parent,
                isCollapsed: false,
                userInfoFields: [
                  ...parent.userInfoFields,
                  {
                    ...userInfoField,
                  },
                ],
              };
            }
            return parent;
          }
        );

        group.userInfoParents = updatedParents;
        newProfileConfigurationData.set(groupKey, group);
        updateProfileConfigurationData(newProfileConfigurationData);
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const updateFieldSection = useCallback(
    (groupKey: string, parentKey: string, field: UserInfoField_OP) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      const group = newProfileConfigurationData.get(groupKey);

      if (!group) return;

      const updatedParents = group.userInfoParents.map((parent) => {
        if (parent.configKey === parentKey) {
          return {
            ...parent,
            userInfoFields: parent.userInfoFields.map((f) =>
              f.configKey === field.configKey ? field : f
            ),
          };
        }
        return parent;
      });

      const updatedGroup = {
        ...group,
        userInfoParents: updatedParents,
      };

      newProfileConfigurationData.set(groupKey, updatedGroup);
      updateProfileConfigurationData(newProfileConfigurationData);
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const addNewParentSection = useCallback(
    (groupKey: string, userInfoParent: UserInfoParent_OP) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      const group = newProfileConfigurationData.get(groupKey);

      if (group) {
        group.userInfoParents.push({
          ...userInfoParent,
        });

        newProfileConfigurationData.set(groupKey, group);
        updateProfileConfigurationData(newProfileConfigurationData);
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const duplicateParentSection = useCallback(
    (groupKey: string, parentKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      const group = newProfileConfigurationData.get(groupKey);

      if (group) {
        const parentToDuplicate = group.userInfoParents.find(
          (parent) => parent.configKey === parentKey
        );

        if (parentToDuplicate) {
          const newParent = {
            ...parentToDuplicate,
            uniqueKey: getUniqueParentKey(),
            label: parentToDuplicate.label + " Copy",
            userInfoFields: parentToDuplicate.userInfoFields.map((field) => ({
              ...field,
              uniqueKey: getUniqueFieldKey(),
            })),
          };

          const updatedParents = [...group.userInfoParents, newParent];
          group.userInfoParents = updatedParents;

          newProfileConfigurationData.set(groupKey, group);
          updateProfileConfigurationData(newProfileConfigurationData);
        }
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const duplicateFieldSection = useCallback(
    (groupKey: string, parentKey: string, fieldKey: string) => {
      const newProfileConfigurationData = new Map(profileConfigurationData);
      const group = newProfileConfigurationData.get(groupKey);

      if (group) {
        const parentToUpdate = group.userInfoParents.find(
          (parent) => parent.configKey === parentKey
        );

        if (parentToUpdate) {
          const fieldToDuplicate = parentToUpdate.userInfoFields.find(
            (field) => field.configKey === fieldKey
          );

          if (fieldToDuplicate) {
            const newField = {
              ...fieldToDuplicate,
              uniqueKey: getUniqueFieldKey(),
            };

            const updatedFields = [...parentToUpdate.userInfoFields, newField];
            parentToUpdate.userInfoFields = updatedFields;

            newProfileConfigurationData.set(groupKey, group);
            updateProfileConfigurationData(newProfileConfigurationData);
          }
        }
      }
    },
    [profileConfigurationData, updateProfileConfigurationData]
  );

  const value = useMemo(
    () => ({
      unsavedChanges,
      updateUnsavedChanges,
      fieldInputOptions,
      updateFieldInputOptions,
      profileConfigurationData,
      updateProfileConfigurationData,
      updateCurrectActiveTab,
      removeProfileConfigurationTab,
      addNewProfileConfigurationTab,
      updateProfileConfigurationTabLable,
      updateParentInEditMode,
      updateParentIsCollapsed,
      updateParentSection,
      deleteParent,
      deleteField,
      addNewTextField,
      updateFieldSection,
      addNewParentSection,
      duplicateParentSection,
      duplicateFieldSection,
    }),
    [
      unsavedChanges,
      updateUnsavedChanges,
      fieldInputOptions,
      updateFieldInputOptions,
      profileConfigurationData,
      updateProfileConfigurationData,
      updateCurrectActiveTab,
      removeProfileConfigurationTab,
      addNewProfileConfigurationTab,
      updateProfileConfigurationTabLable,
      updateParentInEditMode,
      updateParentIsCollapsed,
      updateParentSection,
      deleteParent,
      deleteField,
      addNewTextField,
      updateFieldSection,
      addNewParentSection,
      duplicateParentSection,
      duplicateFieldSection,
    ]
  );

  return (
    <ProfileConfigurationContext.Provider value={value}>
      {children}
    </ProfileConfigurationContext.Provider>
  );
};

const useProfileConfigurationContextProvider = () => {
  const context = useContext(ProfileConfigurationContext);
  if (!context) {
    throw new Error(
      "useProfileConfigurationContextProvider must be used within a ProfileConfigurationContextProvider"
    );
  }
  return context;
};

export {
  ProfileConfigurationContextProvider,
  useProfileConfigurationContextProvider,
};
