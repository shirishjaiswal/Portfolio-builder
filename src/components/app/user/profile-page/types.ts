import { InputTypeSelection } from "@/components/app/admin-control/page-navigation/type";

export type UserSectionField = {
  key: string;
  isVisible: boolean;
  isRequired: boolean;
  selectionType: InputTypeSelection;
  label: string;
  dropdownSelection: "single" | "multi";
  dropdownOptions: string[];
  dropLinkSelection: string[];
  isStartDate: boolean;
  isEndDate: boolean;
  isOnGoing: boolean;
  startDate: string;
  endDate: string;
  onGoing: boolean;
  inputValue: any[];
};

export type UserProfileSection = {
  key: string;
  isCollapsed: boolean;
  sectionFields: UserSectionField[];
};

export type UserProfileSectionData = {
  key: string;
  sectionName: string;
  isMulti: boolean;
  isSectionNameVisible: boolean;
  isSectionRequired: boolean;
  userProfileSections: UserProfileSection[];
};

export type UserProfileData = {
  isActive : boolean,
  navigationName : string,
  userProfileSectionsData : Map<string, UserProfileSectionData>
};

export type UserProfile = Map<string, UserProfileData>;

export type SerializeUserProfile = {
  key: string;
  userProfileData: {
    isActive: boolean;
    navigationName: string;
    userProfileSectionsData: {
      key: string;
      value: UserProfileSectionData;
    }[]
  };
}

export type SiteSectionField = {
  type: InputTypeSelection;
  isVisible: boolean;
  label?: string;
  value?: string | boolean;
}

export type SubSection = SiteSectionField[]

export type Section = {
  sectionName : string,
  subSections : SubSection[]
};

export type UserSiteProfile = {
  key: string;
  navigationName: string;
  sectionSet: Section[];
}

