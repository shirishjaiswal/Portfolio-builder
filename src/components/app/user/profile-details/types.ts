import { UserDetailsType } from "@/context/user-settings-context";
import { UserInfoField_I, UserInfoGroup_I, UserInfoParent_I } from "../profile-configuration/type";

export interface UserProfileDetailsFieldValue {
  id?: number;
  value: string;
  listValue: string[];
  startDate: string;
  endDate: string;
  onGoing: boolean;
}

export interface UserProfileDetailsField {
  id?: number;
  configKey: string;
  uniqueKey: string;
  userInfoField: UserInfoField_I;
  userProfileDetailsFieldValue: UserProfileDetailsFieldValue;
}

export interface UserProfileDetailsParent {
  id?: number;
  configKey: string;
  uniqueKey: string;
  userInfoParent: UserInfoParent_I;
  userProfileDetailsField: UserProfileDetailsField[];
}

export interface UserProfileDetailsGroup {
  id?: number;
  configKey: string;
  uniqueKey: string;
  userInfoGroup: UserInfoGroup_I;
  userEntity: UserDetailsType;
  userProfileDetailsParent: UserProfileDetailsParent[];
}



