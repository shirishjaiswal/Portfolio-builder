import {
  ProfileConfigurationSection,
  UserInfoField_I,
  UserInfoField_OP,
  UserInfoGroup_I,
  UserInfoGroup_OP,
  UserInfoParent_I,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";

export const getUniqueKey = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const addHyphen = (key: string | undefined) => {
  key = key?.toLocaleLowerCase();
  if (!key) return ""; 
  return `-${key.trim().replace(/\s+/g, "-")}`; 
};

export const getUniqueGroupKey = (key?: string) => {
  return `config-group-${getUniqueKey()}${addHyphen(key)}`;
};

export const getUniqueParentKey = (key?: string) => {
  return `config-parent-${getUniqueKey()}${addHyphen(key)}`;
};

export const getUniqueFieldKey = (key?: string) => {
  return `config-field-${getUniqueKey()}${addHyphen(key)}`;
};

export const profileConfigurationResponseToUserInfoGroupOP = (
  response: UserInfoGroup_I[]
): UserInfoGroup_OP[] => {
  const userInfoGroup: UserInfoGroup_OP[] = [];
  response.forEach((group: UserInfoGroup_I, index: number) => {
    userInfoGroup.push({
      id: group.id,
      configKey: group.configKey,
      description: group.description,
      position: group.position,
      label: group.label,
      visible: group.visible,
      isActive: index === 0,
      hasUnsavedChanges: false,
      userInfoParents: group.userInfoParents.map(
        (parent: UserInfoParent_I, index: number) : UserInfoParent_OP => ({
          id: parent.id,
          configKey: parent.configKey,
          label: parent.label,
          description: parent.description,
          hasUnsavedChanges: false,
          userInfoFields: parent.userInfoFields.map(
            (field: UserInfoField_I) : UserInfoField_OP => ({
              id: field.id,
              configKey: field.configKey,
              input: field.input,
              label: field.label,
              required: field.required,
              description: field.description,
              hasMultiSelection: field.hasMultiSelection,
              options: field.options,
              startDate: field.startDate,
              endDate: field.endDate,
              onGoing: field.onGoing,
              hasUnsavedChanges: false,
            })
          ),
          required: parent.required,
          labelVisible: parent.labelVisible,
          multi: parent.multi,
          isCollapsed: index === 0 ? false : true,
          inEditMode: false,
        })
      ),
    });
  });

  return userInfoGroup;
};

export const getProfileConfigurationSection = (
  response: UserInfoGroup_I[]
): ProfileConfigurationSection => {
  const userInfoGroupOP =
    profileConfigurationResponseToUserInfoGroupOP(response);
  const profileConfigurationSection: ProfileConfigurationSection = new Map();
  userInfoGroupOP.forEach((userInfoGroup: UserInfoGroup_OP) => {
    profileConfigurationSection.set(userInfoGroup.configKey, userInfoGroup);
  });
  return profileConfigurationSection;
};

export const getActiveTab = (
  profileConfigurationSection: ProfileConfigurationSection
): UserInfoGroup_OP | undefined => {
  let activeTab: string = "";
  profileConfigurationSection.forEach(
    (userInfoGroup: UserInfoGroup_OP, key: string) => {
      if (userInfoGroup.isActive) {
        activeTab = key;
      }
    }
  );

  return profileConfigurationSection.get(activeTab);
};
