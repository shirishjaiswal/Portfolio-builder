"use client";

import {
  UserProfile,
  UserSectionField,
} from "@/components/user/profile/types";
import _ from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface UserProfileContextProps {
  userProfile: UserProfile;
  updateUserProfile: (userProfile: UserProfile) => void;
  setActiveNavigationTab: (navigationKey: string) => void;
  addNewSection: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number
  ) => void;
  removeSection: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number
  ) => void;
  setStartDate: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number,
    value: string
  ) => void;
  setEndDate: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number,
    value: string
  ) => void;
  setOnGoing: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number
  ) => void;
  setDropdownValue: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number,
    value: string | string[] | null
  ) => void;
  setListValue: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number,
    value: string[]
  ) => void;
  setInputTexts: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number,
    value: string | null
  ) => void;
  setDropLink: (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number,
    sectionFieldIdx: number,
    value: string
  ) => void;
}

const userProfileContext = createContext<UserProfileContextProps | undefined>(
  undefined
);

interface UserProfileProviderContextProps {
  children: ReactNode;
}

const UserProfileContextProvider = ({
  children,
}: UserProfileProviderContextProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(
    new Map() as UserProfile
  );

  const updateUserProfile = useCallback((userProfile: UserProfile) => {
    setUserProfile(new Map(userProfile));
  }, []);

  const setActiveNavigationTab = useCallback(
    (navigationKey: string) => {
      const updatedUserProfile = new Map(userProfile);
      const currentValue = updatedUserProfile.get(navigationKey);
      if (currentValue && !currentValue.isActive) {
        updatedUserProfile.forEach((section, sectionKey) => {
          if (sectionKey === navigationKey) section.isActive = true;
          else section.isActive = false;
        });
      }
      updateUserProfile(userProfile);
    },
    [userProfile, updateUserProfile]
  );

  const addNewSection = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number
    ) => {
      const updatedUserProfile = _.cloneDeep(userProfile); // Deep clone
  
      const getSectionFields = (
        sectionFields: UserSectionField[] | undefined
      ) => {
        if (!sectionFields) return [];
        return sectionFields.map((field) => ({
          ...field,
          startDate: "",
          endDate: "",
          onGoing: false,
          inputValue: [],
          dropLinkSelection: [],
        }));
      };
  
      const currentValue = updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(userProfileSectionsKey)!
        .userProfileSections.at(userProfileSectionIndex);
  
      if (currentValue) {
        const newSectionToAdd = _.cloneDeep(currentValue); // Deep clone the section
        updatedUserProfile
          .get(userProfileKey)!
          .userProfileSectionsData.get(userProfileSectionsKey)
          ?.userProfileSections.push({
            ...newSectionToAdd,
            key: `${userProfileSectionsKey}-${userProfileSectionIndex + 1}`,
            isCollapsed: newSectionToAdd.isCollapsed ?? false,
            sectionFields: getSectionFields(newSectionToAdd.sectionFields),
          });
      }
  
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const removeSection = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number
    ) => {
      const updatedUserProfile = new Map(userProfile);
      updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(userProfileSectionsKey)!
        .userProfileSections.splice(userProfileSectionIndex, 1);
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setOnGoing = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number
    ) => {
      const updatedUserProfile = new Map(userProfile);
      updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(
          userProfileSectionsKey
        )!.userProfileSections[userProfileSectionIndex].sectionFields[
        sectionFieldIdx
      ].onGoing = !updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(userProfileSectionsKey)!
        .userProfileSections[userProfileSectionIndex].sectionFields[
        sectionFieldIdx
      ].onGoing;
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setStartDate = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number,
      value: string
    ) => {
      const updatedUserProfile = new Map(userProfile);
      updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(
          userProfileSectionsKey
        )!.userProfileSections[userProfileSectionIndex].sectionFields[
        sectionFieldIdx
      ].startDate = value;
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setEndDate = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number,
      value: string
    ) => {
      const updatedUserProfile = new Map(userProfile);
      updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(
          userProfileSectionsKey
        )!.userProfileSections[userProfileSectionIndex].sectionFields[
        sectionFieldIdx
      ].endDate = value;
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setListValue = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number,
      value: string[]
    ) => {
      const updatedUserProfile = new Map(userProfile);
      updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(
          userProfileSectionsKey
        )!.userProfileSections[userProfileSectionIndex].sectionFields[
        sectionFieldIdx
      ].inputValue = value;
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setDropdownValue = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number,
      value: string | string[] | null
    ) => {
      const updatedUserProfile = new Map(userProfile);
      const isMulti =
        updatedUserProfile
          .get(userProfileKey)!
          .userProfileSectionsData.get(userProfileSectionsKey)!
          .userProfileSections[userProfileSectionIndex].sectionFields[
          sectionFieldIdx
        ].dropdownSelection === "multi";

      if (isMulti && value && typeof value === "object") {
        console.log("Multi");
        updatedUserProfile
          .get(userProfileKey)!
          .userProfileSectionsData.get(
            userProfileSectionsKey
          )!.userProfileSections[userProfileSectionIndex].sectionFields[
          sectionFieldIdx
        ].inputValue = [...value];
      } else if (!isMulti && value && typeof value === "string") {
        console.log("Single");
        updatedUserProfile
          .get(userProfileKey)!
          .userProfileSectionsData.get(
            userProfileSectionsKey
          )!.userProfileSections[userProfileSectionIndex].sectionFields[
          sectionFieldIdx
        ].inputValue = [value];
      } else if (!isMulti && !value) {
        console.log("Single");
        updatedUserProfile
          .get(userProfileKey)!
          .userProfileSectionsData.get(
            userProfileSectionsKey
          )!.userProfileSections[userProfileSectionIndex].sectionFields[
          sectionFieldIdx
        ].inputValue = [];
      }

      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setDropLink = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number,
      value: string
    ) => {
      const updatedUserProfile = new Map(userProfile);
      updatedUserProfile
        .get(userProfileKey)!
        .userProfileSectionsData.get(
          userProfileSectionsKey
        )!.userProfileSections[userProfileSectionIndex].sectionFields[
        sectionFieldIdx
      ].dropLinkSelection = [value];
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const setInputTexts = useCallback(
    (
      userProfileKey: string,
      userProfileSectionsKey: string,
      userProfileSectionIndex: number,
      sectionFieldIdx: number,
      value: string | null
    ) => {
      const updatedUserProfile = new Map(userProfile);
      value !== null
        ? (updatedUserProfile
            .get(userProfileKey)!
            .userProfileSectionsData.get(
              userProfileSectionsKey
            )!.userProfileSections[userProfileSectionIndex].sectionFields[
            sectionFieldIdx
          ].inputValue = [value])
        : (updatedUserProfile
            .get(userProfileKey)!
            .userProfileSectionsData.get(
              userProfileSectionsKey
            )!.userProfileSections[userProfileSectionIndex].sectionFields[
            sectionFieldIdx
          ].inputValue = []);
      updateUserProfile(updatedUserProfile);
    },
    [userProfile, updateUserProfile]
  );

  const value = useMemo(
    () => ({
      userProfile,
      updateUserProfile,
      setActiveNavigationTab,
      addNewSection,
      removeSection,
      setStartDate,
      setEndDate,
      setOnGoing,
      setDropdownValue,
      setListValue,
      setInputTexts,
      setDropLink
    }),
    [
      userProfile,
      updateUserProfile,
      setActiveNavigationTab,
      addNewSection,
      removeSection,
      setStartDate,
      setEndDate,
      setOnGoing,
      setDropdownValue,
      setListValue,
      setInputTexts,
      setDropLink
    ]
  );

  return (
    <userProfileContext.Provider value={value}>
      {children}
    </userProfileContext.Provider>
  );
};

const useUSerProfileContextProvider = () => {
  const context = useContext(userProfileContext);
  if (context === undefined) {
    throw new Error(
      "useUserProfileContextProvider must be used within a useUserProfileContextProvider"
    );
  }
  return context;
};

export { UserProfileContextProvider, useUSerProfileContextProvider };
