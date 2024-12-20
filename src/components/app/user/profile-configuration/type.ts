
export interface ParentSection {
  id?: number;
  uniqueKey: string;
  label: string;
  description: string;
  multi: boolean;
  required: boolean;
  labelVisible: boolean;
}

export type UserInfoField_OP = {
  id: number;
  uniqueKey: string;
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
};

export type UserInfoParent_OP = ParentSection & {
  userInfoFields: UserInfoField_OP[];
  inEditMode?: boolean;
  isCollapsed?: boolean;
};

export type UserInfoGroup_OP = {
  id: number;
  uniqueKey: string;
  label: string;
  description: string;
  position: number;
  visible: boolean;
  userInfoParents: UserInfoParent_OP[];
  isActive?: boolean;
};

export type ProfileConfigurationSection = Map<string, UserInfoGroup_OP>;

export type UserInfoField_I = {
  id: number;
  uniqueKey: string;
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
  uniqueKey: string;
  label: string;
  description: string;
  userInfoFields: UserInfoField_I[];
  required: boolean;
  labelVisible: boolean;
  multi: boolean;
};

export type UserInfoGroup_I = {
  id: number;
  uniqueKey: string;
  label: string;
  description: string;
  position: number;
  visible: boolean;
  userInfoParents: UserInfoParent_I[];
};
