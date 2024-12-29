import { getUniqueFieldKey, getUniqueGroupKey, getUniqueParentKey } from "@/components/app/user/profile-configuration/helper";
import {
  UserInfoField_I,
  UserInfoGroup_I,
  UserInfoParent_I,
} from "@/components/app/user/profile-configuration/type";
import {
  UserProfileDetails,
  UserProfileDetailsField,
  UserProfileDetailsParent,
  UserProfileDetilsGroup,
  UserProfileFields,
  UserProfileParents,
} from "@/components/app/user/profile/types";
import fetchData from "@/endpoints/spring-boot";
import GET_USER_INFO_GROUP from "@/endpoints/spring-boot/admin/get-user-info-group";
import GET_USER_PROFILE_DATA from "@/endpoints/spring-boot/user/get-user-profile-data";
import { getUserId } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookie = cookies().get("pb_session_token");

    const userEntityId = await getUserId(cookie?.value);

    if (!userEntityId || userEntityId === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    const [userProfileDataResponse, userInfoGroupResponse] = await Promise.all([
      fetchData({ connection: GET_USER_PROFILE_DATA(userEntityId) }),
      fetchData({ connection: GET_USER_INFO_GROUP() }),
    ]);

    if (!userInfoGroupResponse?.data) {
      return NextResponse.json(
        { error: userProfileDataResponse?.error || "Request failed" },
        { status: 500 }
      );
    }

    if (userInfoGroupResponse?.data.length === 0) {
      return NextResponse.json(
        { error: "No user info group found" },
        { status: 500 }
      );
    }

    let profileDataWithUserGroup;
    
    if (userProfileDataResponse?.data) {
      profileDataWithUserGroup = generateUserProfileDataFields(
        JSON.parse(userProfileDataResponse.data.userProfileDataJSON),
        userInfoGroupResponse.data
      );
    } else {
      profileDataWithUserGroup = generateEmptyUserData(
        userInfoGroupResponse.data
      );
    }

    const response = {
      userProfileData: profileDataWithUserGroup,
      userInfoGroup: userInfoGroupResponse.data,
    };

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api:", error);

    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
const generateEmptyUserData = (userInfoGroup: UserInfoGroup_I[]) => {
  
  const userInfoGroups: UserProfileDetilsGroup[] = [];

  userInfoGroup.forEach((group: UserInfoGroup_I, index: number) => {
    userInfoGroups.push({
      id: group.id,
      uniqueKey: getUniqueGroupKey(),
      configKey: group.configKey,
      description: group.description,
      position: group.position,
      label: group.label,
      visible: group.visible,
      isActive: index === 0,
      userInfoParents: group.userInfoParents.map(
        (parent: UserInfoParent_I) => ({
          id: parent.id,
          uniqueKey: getUniqueParentKey(),
          configKey: parent.configKey,
          label: parent.label,
          description: parent.description,
          multi: parent.multi,
          required: parent.required,
          labelVisible: parent.labelVisible,
          isCollapsed: true,
          userInfoFields: parent.userInfoFields.map(
            (field: UserInfoField_I) => ({
              id: field.id,
              uniqueKey: getUniqueFieldKey(),
              configKey: field.configKey,
              label: field.label,
              description: field.description,
              input: field.input,
              required: field.required,
              hasMultiSelection: field.hasMultiSelection,
              options: field.options,
              startDate: field.startDate,
              endDate: field.endDate,
              onGoing: field.onGoing,
              value: {
                inputValue: "",
                startDate: null,
                endDate: null,
                onGoing: false,
                inputValueArray: [],
              },
            })
          ),
        })
      ),
    });
  });

  return userInfoGroups;
};

const generateUserProfileDataFields = (
  userProfileData: UserProfileDetails[],
  userInfoGroup: UserInfoGroup_I[]
): UserProfileDetilsGroup[] => {
  let userInfoGroups: UserProfileDetilsGroup[] = [];

  userProfileData.forEach((userProfile: UserProfileDetails, index : number) => {

    const userInfoGroupData = userInfoGroup.find(
      (group: UserInfoGroup_I) => group.configKey === userProfile.configKey
    );

    if (!userInfoGroupData) return;

    const newUserInfoParents: UserProfileDetailsParent[] = [];
    
    userProfile.userProfileParents.forEach((parent: UserProfileParents) => {
      const userInfoParentData = userInfoGroupData.userInfoParents.find(
        (parentData: UserInfoParent_I) =>
          parentData.configKey === parent.configKey
      );

      if (!userInfoParentData) return;

      const newUserInfoFields: UserProfileDetailsField[] = [];

      parent.userProfileFields.forEach((field: UserProfileFields) => {
        const userInfoFieldData = userInfoParentData.userInfoFields.find(
          (fieldData: UserInfoField_I) =>
            fieldData.configKey === field.configKey
        );

        if (!userInfoFieldData) return;

        const newUserInfoField: UserProfileDetailsField = {
          configKey: field.configKey,
          uniqueKey: field.uniqueKey,
          label: userInfoFieldData.label,
          description: userInfoFieldData.description,
          input: userInfoFieldData.input,
          required: userInfoFieldData.required,
          hasMultiSelection: userInfoFieldData.hasMultiSelection,
          options: userInfoFieldData.options,
          startDate: userInfoFieldData.startDate,
          endDate: userInfoFieldData.endDate,
          onGoing: userInfoFieldData.onGoing,
          value: field.value,
        };

        newUserInfoFields.push(newUserInfoField);
      });

      const newUserInfoParent: UserProfileDetailsParent = {
        configKey: parent.configKey,
        uniqueKey: parent.uniqueKey,
        label: userInfoParentData.label,
        description: userInfoParentData.description,
        multi: userInfoParentData.multi,
        required: userInfoParentData.required,
        labelVisible: userInfoParentData.labelVisible,
        userInfoFields: newUserInfoFields,
        isCollapsed: true,
      };

      newUserInfoParents.push(newUserInfoParent);
    });

    const newUserInfoGroup: UserProfileDetilsGroup = {
      id: userInfoGroupData.id,
      uniqueKey: userInfoGroupData.configKey,
      configKey: userInfoGroupData.configKey,
      description: userInfoGroupData.description,
      position: userInfoGroupData.position,
      label: userInfoGroupData.label,
      visible: userInfoGroupData.visible,
      isActive: index === 0,
      userInfoParents: newUserInfoParents,
    };

    userInfoGroups.push(newUserInfoGroup);
  });

  userInfoGroups = addNewConfigFields(userInfoGroups, userInfoGroup);

  userInfoGroups[0].isActive = true;
  return userInfoGroups;
};

const addNewConfigFields = (userInfoGroups: UserProfileDetilsGroup[], userInfoGroup: UserInfoGroup_I[]) => {
  userInfoGroup.forEach((group: UserInfoGroup_I) => {
    const userInfoGroupData = userInfoGroups.find((groupData: UserProfileDetilsGroup) => groupData.configKey === group.configKey);
    if (!userInfoGroupData) {
      addNewGroup(userInfoGroups, group);
      return;
    }
    group.userInfoParents.forEach((parent: UserInfoParent_I) => {
      const userInfoParentData = userInfoGroupData.userInfoParents.find((parentData: UserProfileDetailsParent) => parentData.configKey === parent.configKey);
      if (!userInfoParentData) {
        addNewParent(userInfoGroups, group.id, parent);
        return;
      };
      parent.userInfoFields.forEach((field: UserInfoField_I) => {
        const userInfoFieldData = userInfoParentData.userInfoFields.find((fieldData: UserProfileDetailsField) => fieldData.configKey === field.configKey);
        if (!userInfoFieldData) {
          addNewField(userInfoGroups, group.id, parent.id, field);
          return;
        };
      });
    });
  })
  return userInfoGroups;
};

const addNewGroup = (userInfoGroups: UserProfileDetilsGroup[], userInfoGroup: UserInfoGroup_I) => {  
  const newUserInfoGroupData: UserProfileDetilsGroup = {
    id: userInfoGroup.id,
    uniqueKey: getUniqueGroupKey(),
    configKey: userInfoGroup.configKey,
    description: userInfoGroup.description,
    position: userInfoGroup.position,
    label: userInfoGroup.label,
    visible: userInfoGroup.visible,
    isActive: false,
    userInfoParents: [],
  };

  const newUserInfoParents: UserProfileDetailsParent[] = [];
  userInfoGroup.userInfoParents.forEach((parent: UserInfoParent_I) => {
    const newUserInfoParent: UserProfileDetailsParent = {
      configKey: parent.configKey,
      uniqueKey: getUniqueParentKey(),
      label: parent.label,
      description: parent.description,
      multi: parent.multi,
      required: parent.required,
      labelVisible: parent.labelVisible,
      userInfoFields: [],
      isCollapsed: false,
    };
    parent.userInfoFields.forEach((field: UserInfoField_I) => {
      const newUserInfoField: UserProfileDetailsField = {
        configKey: field.configKey,
        uniqueKey: getUniqueFieldKey(),
        label: field.label,
        description: field.description,
        input: field.input,
        required: field.required,
        hasMultiSelection: field.hasMultiSelection,
        options: field.options,
        startDate: field.startDate,
        endDate: field.endDate,
        onGoing: field.onGoing,
        value: {
          inputValue: "",
          inputValueArray: [],
          startDate: "",
          endDate: "",
          onGoing: false
        },
      };
      newUserInfoParent.userInfoFields.push(newUserInfoField);
    });
    newUserInfoParents.push(newUserInfoParent);
  })
  newUserInfoGroupData.userInfoParents = newUserInfoParents;
  userInfoGroups.push(newUserInfoGroupData);
  
  return userInfoGroups;
}

const addNewParent = (userInfoGroups: UserProfileDetilsGroup[], userInfoGroupId: number, userInfoParent: UserInfoParent_I) => {
  
  userInfoGroups.forEach((group: UserProfileDetilsGroup) => {
    if (group.id === userInfoGroupId) {
      const userInfoGroupData = userInfoGroups.find((groupData: UserProfileDetilsGroup) => groupData.configKey === group.configKey);
      if (!userInfoGroupData) return;
      const newUserInfoParent: UserProfileDetailsParent = {
        configKey: userInfoParent.configKey,
        uniqueKey: getUniqueParentKey(),
        label: userInfoParent.label,
        description: userInfoParent.description,
        multi: userInfoParent.multi,
        required: userInfoParent.required,
        labelVisible: userInfoParent.labelVisible,
        userInfoFields: [],
        isCollapsed: false,
      };
      const userInfoField : UserProfileDetailsField[] = [];
      userInfoParent.userInfoFields.forEach((field: UserInfoField_I) => {
        const newUserInfoField: UserProfileDetailsField = {
          configKey: field.configKey,
          uniqueKey: getUniqueFieldKey(),
          label: field.label,
          description: field.description,
          input: field.input,
          required: field.required,
          hasMultiSelection: field.hasMultiSelection,
          options: field.options,
          startDate: field.startDate,
          endDate: field.endDate,
          onGoing: field.onGoing,
          value: {
            inputValue: "",
            inputValueArray: [],
            startDate: "",
            endDate: "",
            onGoing: false
          },
        };
        userInfoField.push(newUserInfoField);
      });
      newUserInfoParent.userInfoFields = userInfoField;
      userInfoGroupData.userInfoParents.push(newUserInfoParent);
    }
  })
  return userInfoGroups;
}

const addNewField = (userInfoGroups: UserProfileDetilsGroup[], userInfoGroupId: number, userInfoParentId: number, userInfoField: UserInfoField_I) => {
  
  userInfoGroups.forEach((group: UserProfileDetilsGroup) => {
    if (group.id === userInfoGroupId) {
      const userInfoGroupData = userInfoGroups.find((groupData: UserProfileDetilsGroup) => groupData.configKey === group.configKey);
      if (!userInfoGroupData) return;
      const userInfoParentData = userInfoGroupData.userInfoParents.filter((parentData: UserProfileDetailsParent) => parentData.id === userInfoParentId);
      if (!userInfoParentData) return;
      const newUserInfoField: UserProfileDetailsField = {
        configKey: userInfoField.configKey,
        uniqueKey: getUniqueFieldKey(),
        label: userInfoField.label,
        description: userInfoField.description,
        input: userInfoField.input,
        required: userInfoField.required,
        hasMultiSelection: userInfoField.hasMultiSelection,
        options: userInfoField.options,
        startDate: userInfoField.startDate,
        endDate: userInfoField.endDate,
        onGoing: userInfoField.onGoing,
        value: {
          inputValue: "",
          inputValueArray: [],
          startDate: "",
          endDate: "",
          onGoing: false
        },
      };
      userInfoParentData.forEach((parent: UserProfileDetailsParent) => parent.userInfoFields.push(newUserInfoField));
    }
  })
  return userInfoGroups;
}