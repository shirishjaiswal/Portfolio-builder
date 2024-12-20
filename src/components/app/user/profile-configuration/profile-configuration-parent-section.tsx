import {
  ParentSection,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";
import Badge from "@/components/global-components/badge/badge";
import { useState } from "react";
import ProfileConfigurationFieldSection from "./profile-configuration-field-secrion";
import ParentSectionActionButtons from "./parent-section-action-buttons";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { CirclePlus } from "lucide-react";
import ProfileConfigurationParentEditSection from "./profile-configuration-parent-edit-section";

type ProfileConfigurationParentSectionProps = {
  parent: UserInfoParent_OP;
  groupUniqueKey: string;
};

const ProfileConfigurationParentSection: React.FC<
  ProfileConfigurationParentSectionProps
> = ({ parent, groupUniqueKey }: ProfileConfigurationParentSectionProps) => {
  const { unsavedChanges, updateParentIsCollapsed, addNewTextField } =
    useProfileConfigurationContextProvider();

  const [editParentSectionData, setEditParentSectionData] =
    useState<ParentSection | null>({
      id: parent.id,
      uniqueKey: parent.uniqueKey,
      label: parent.label,
      description: parent.description,
      multi: parent.multi,
      required: parent.required,
      labelVisible: parent.labelVisible,
    });

  const handleCollapsedSection = (parentUniqueKey: string) => {
    updateParentIsCollapsed(groupUniqueKey, parentUniqueKey);
  };

  const addNewField = () => {
    addNewTextField(groupUniqueKey, parent.uniqueKey);
  };

  return (
    <div
      key={parent.uniqueKey}
      className="relative bg-gray-100 px-4 pb-4 pt-1 rounded-md group mb-5 drop-shadow	"
    >
      <div key={parent.uniqueKey} className="relative bg-gray-100 rounded-md">
        {!parent.inEditMode && (
          <button
            className={`flex items-center font-semibold gap-2 w-full pt-2`}
            onClick={() => handleCollapsedSection(parent.uniqueKey)}
          >
            <p>{parent.label}</p>
            {parent.required && (
              <Badge text="Required" color="red" type="secondary" size="xs" />
            )}
            {parent.multi ? (
              <Badge text="Multi" color="skyblue" type="secondary" size="xs" />
            ) : (
              <Badge
                text="Non-Multi"
                color="skyblue"
                type="secondary"
                size="xs"
              />
            )}
            {parent.labelVisible && (
              <Badge text="Visible" color="green" type="secondary" size="xs" />
            )}
            {unsavedChanges?.get(groupUniqueKey)?.get(parent.uniqueKey)?.size >
              0 && (
              <Badge
                text="Unsaved Changes"
                color="red"
                type="primary"
                size="xs"
              />
            )}
          </button>
        )}

        <ProfileConfigurationParentEditSection
          parent={parent}
          editParentSectionData={editParentSectionData}
          setEditParentSectionData={setEditParentSectionData}
        />
      </div>
      {
        <div
          className={`flex gap-2 justify-center items-center absolute -top-2 -right-2 p-1.5 bg-white rounded-full ${
            parent.inEditMode ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100 shadow-sm border-slate00 border transition-opacity duration-300 delay-110 drop-shadow-xl`}
        >
          <ParentSectionActionButtons
            parent={parent}
            editParentSectionData={editParentSectionData}
            setEditParentSectionData={setEditParentSectionData}
          />
        </div>
      }
      {parent.userInfoFields.map((field) => (
        <div
          key={field.uniqueKey}
          className={` ${parent.isCollapsed ? "hidden" : "block"} mt-3`}
        >
          <ProfileConfigurationFieldSection
            field={field}
            groupUniqueKey={groupUniqueKey}
            parentUniqueKey={parent.uniqueKey}
          />
        </div>
      ))}
      <div
        className={`flex gap-1 justify-center items-center absolute -bottom-2 -right-2 p-1.5 bg-white border text-teal-500 hover:bg-teal-50 hover:border-teal-500 transation-all rounded-full shadow-sm border-slate00  drop-shadow-xl hover:rounded-full ${
          parent.isCollapsed
            ? "hidden"
            : parent.userInfoFields.length <= 0
            ? "hidden"
            : "block"
        } transition duration-200 drop-shadow-lg ease-in-out`}
      >
        <button
          className="flex items-center space-x-0.5"
          onClick={addNewField}
          id="add-new-field-button"
        >
          <CirclePlus color="#14b8a6" size={20} />
          <p className="text-sm font-semibold ">Add Field</p>
        </button>
      </div>
      <div
        className={`flex-col ${
          parent.userInfoFields.length <= 0 ? "flex" : "hidden"
        } ${parent.inEditMode ? "hidden" : "block"} gap-1 justify-center items-center`}
      >
        <p className="text-medium text-gray-500 text-center">
          No fields added yet
        </p>
        <div
          className={`flex gap-1 justify-center items-center p-2 bg-white border text-teal-500 hover:bg-teal-50 hover:border-teal-500 transition-all rounded-full shadow-sm border-slate-200 drop-shadow-lg ease-in-out `}
          style={{
            width: "fit-content",
          }}
        >
          <button
            className="flex items-center space-x-1"
            onClick={addNewField}
            id="add-new-field-button"
          >
            <CirclePlus color="#14b8a6" size={16} />
            <p className="text-xs font-bold">Add Field</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileConfigurationParentSection;
