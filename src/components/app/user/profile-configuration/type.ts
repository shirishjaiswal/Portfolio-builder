
export interface ParentSection {
  id?: number;
  configKey: string;
  label: string;
  description: string;
  multi: boolean;
  required: boolean;
  labelVisible: boolean;
}
export type value = {
  inputValue?: string
  startDate?: string
  endDate?: string
  onGoing?: boolean
  inputValueArray?: string[]
}

export type UserInfoField_OP = {
  id?: number;
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
  value?: value
};

export type UserInfoParent_OP = ParentSection & {
  hasUnsavedChanges?: boolean;
  userInfoFields: UserInfoField_OP[];
  inEditMode?: boolean;
  isCollapsed?: boolean;
};

export type UserInfoGroup_OP = {
  id?: number;
  configKey: string;
  label: string;
  description: string;
  position: number;
  visible: boolean;
  userInfoParents: UserInfoParent_OP[];
  hasUnsavedChanges?: boolean;
  isActive?: boolean;
};

export type ProfileConfigurationSection = Map<string, UserInfoGroup_OP>;

export type UserInfoField_I = {
  id: number;
  configKey: string;
  input: string;
  label: string;
  options?: string[];
  description: string;
  required: boolean;
  endDate: boolean;
  startDate: boolean;
  onGoing: boolean;
  hasMultiSelection: boolean;
};

export type UserInfoParent_I = {
  id: number;
  configKey: string;
  label: string;
  description: string;
  userInfoFields: UserInfoField_I[];
  required: boolean;
  labelVisible: boolean;
  multi: boolean;
};

export type UserInfoGroup_I = {
  id: number;
  configKey: string;
  label: string;
  description: string;
  position: number;
  visible: boolean;
  userInfoParents: UserInfoParent_I[];
};
