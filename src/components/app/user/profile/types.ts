export type UserProfileDetails = {
  configKey: string;
  uniqueKey: string;
  userProfileParents: UserProfileParents[];
}

export type UserProfileParents = {
  configKey: string;
  uniqueKey: string;
  userProfileFields: UserProfileFields[];
}

export type UserProfileFields = {
  configKey: string;
  uniqueKey: string;
  input: string;
  label: string;
  value: value
}

export type value = {
  inputValue?: string
  startDate?: string | null
  endDate?: string | null
  onGoing?: boolean
  inputValueArray?: string[]
}

export interface ParentSection {
  id?: number;
  uniqueKey: string;
  configKey: string;
  label: string;
  description: string;
  multi: boolean;
  required: boolean;
  labelVisible: boolean;
}

export type UserProfileDetailsField = {
  id?: number;
  uniqueKey: string;
  configKey: string;
  label: string;
  description: string;
  required: boolean;
  input: string;
  hasMultiSelection?: boolean;
  options?: string[];
  startDate?: boolean;
  endDate?: boolean;
  onGoing?: boolean;
  hasUnsavedChanges?: boolean;
  value: value
};

export type UserProfileDetailsParent = ParentSection & {
  userInfoFields: UserProfileDetailsField[];
  inEditMode?: boolean;
  isCollapsed?: boolean;
};

export type UserProfileDetilsGroup = {
  id?: number;
  uniqueKey: string;
  configKey: string;
  label: string;
  description: string;
  position: number;
  visible: boolean;
  userInfoParents: UserProfileDetailsParent[];
  isActive?: boolean;
};

export type UserProfileData = Map<string, UserProfileDetilsGroup>;