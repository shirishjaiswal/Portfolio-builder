import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { ParentSection, UserInfoGroup_OP } from "./type";
import { useEffect, useState } from "react";
import { getActiveTab } from "./helpet";
import { CirclePlus, Save } from "lucide-react";

import ProfileConfigurationParentSection from "./profile-configuration-parent-section";
import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import postUserInfoGroup from "@/utils/api-connections/admin/post-user-info-group";

const ProfileConfigurationGroupSection = () => {
  const { profileConfigurationData, addNewParentSection, unsavedChanges } =
    useProfileConfigurationContextProvider();

  const [activeTab, setActiveTab] = useState<UserInfoGroup_OP | undefined>(
    undefined
  );

  const [isAddNewSectionDialogBoxOpen, setIsAddNewSectionDIalogueBoxOpen] =
    useState<boolean>(false);

  const [addNewSectionFields, setAddNewSectionFields] = useState<ParentSection>(
    {
      uniqueKey: "",
      label: "",
      description: "",
      multi: false,
      required: false,
      labelVisible: false,
    }
  );

  const handleIsAddNewSectionDialogBoxOpen = () => {
    setIsAddNewSectionDIalogueBoxOpen(!isAddNewSectionDialogBoxOpen);
  };

  useEffect(() => {
    setActiveTab(getActiveTab(profileConfigurationData) ?? undefined);
  }, [profileConfigurationData]);

  const handleAddNewSection = () => {
    setIsAddNewSectionDIalogueBoxOpen(false);
    addNewParentSection(activeTab!.uniqueKey, addNewSectionFields);
  };

  const hasUnsavedChanges = () => {
    let hasUnsavedChanges = false;
    unsavedChanges?.get(activeTab?.uniqueKey)?.forEach((parent) => {
      parent.size > 0 && (hasUnsavedChanges = hasUnsavedChanges || true);
    });
    return hasUnsavedChanges;
  };

  const handleSaveGroupChanges = async () => {
    let response;
    if(activeTab) response = await postUserInfoGroup(activeTab);
    console.log("response", response);
  }

  return activeTab ? (
    <>
      <div className="flex justify-end w-full gap-2">
        <button
          className={`flex items-center space-x-1 -right-0 p-2 border transation-all rounded-full shadow-sm drop-shadow-xl mb-3 transition duration-200 ease-in-out
    ${
      hasUnsavedChanges()
        ? "bg-gray-200 border-gray-200 cursor-not-allowed"
        : "bg-teal-500 border-slate00 hover:bg-teal-600"
    }
  `}
          onClick={handleSaveGroupChanges}
          id="save-changes-button"
          disabled={hasUnsavedChanges()}
        >
          <Save color="#FFFFFF" size={20} />
          <p className="text-medium font-semibold text-white">Save Changes</p>
        </button>
        <button
          className="bg-teal-500 flex items-center space-x-1 -right-0 hover:rounded-full p-2 border hover:bg-teal-600 transation-all rounded-full shadow-sm border-slate00 drop-shadow-xl mb-3 transition duration-200 ease-in-out"
          onClick={handleIsAddNewSectionDialogBoxOpen}
          id="add-new-field-button"
        >
          <CirclePlus color="#FFFFFF" size={20} />
          <p className="text-medium font-semibold text-white">
            Add New Section
          </p>
        </button>
      </div>
      <div>
        {activeTab.userInfoParents.map((parent) => (
          <ProfileConfigurationParentSection
            key={parent.uniqueKey}
            parent={parent}
            groupUniqueKey={activeTab.uniqueKey}
          />
        ))}
        {activeTab.userInfoParents.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 text-gray-700 p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
            <p className="text-lg font-semibold">No Sections Available</p>
            <p className="text-md font-semibold text-gray-500">
              Start by adding a new section to organize your information.
            </p>
          </div>
        )}
      </div>
      {
        <div className={`${isAddNewSectionDialogBoxOpen ? "block" : "hidden"}`}>
          <DialogBox
            isOpen={isAddNewSectionDialogBoxOpen}
            onClose={handleIsAddNewSectionDialogBoxOpen}
            title="Add New Section"
            buttons={[
              {
                label: "Cancel",
                type: "gray",
                onClick: handleIsAddNewSectionDialogBoxOpen,
              },
              {
                label: "Add Section",
                type: "blue",
                onClick: handleAddNewSection,
              },
            ]}
            inputFields={[
              {
                id: "add-new-section-name",
                label: "Section Name",
                type: "text",
                placeholder: "Add section name",
                value: addNewSectionFields.label,
                onChange: (e) => {
                  setAddNewSectionFields({
                    ...addNewSectionFields,
                    label: e.target.value,
                  });
                },
              },
              {
                id: "add-new-section-description",
                label: "Section Description",
                type: "text",
                placeholder: "Add section description",
                value: addNewSectionFields.description,
                onChange: (e) => {
                  setAddNewSectionFields({
                    ...addNewSectionFields,
                    description: e.target.value,
                  });
                },
              },
              {
                id: "add-new-section-is-required",
                label: "Is Section Mandatory",
                type: "dialogueBox",
                checkboxValue: addNewSectionFields.required,
                onChange: () => {
                  setAddNewSectionFields({
                    ...addNewSectionFields,
                    required: !addNewSectionFields.required,
                  });
                },
              },
              {
                id: "add-new-section-is-multi",
                label: "Allow Duplication",
                type: "dialogueBox",
                checkboxValue: addNewSectionFields.multi,
                onChange: () => {
                  setAddNewSectionFields({
                    ...addNewSectionFields,
                    multi: addNewSectionFields.multi ? false : true,
                  });
                },
              },
              {
                id: "add-new-section-is-section-label-visible",
                label: "Show Section Label",
                type: "dialogueBox",
                checkboxValue: addNewSectionFields.labelVisible,
                onChange: () => {
                  setAddNewSectionFields({
                    ...addNewSectionFields,
                    labelVisible: !addNewSectionFields.labelVisible,
                  });
                },
              },
            ]}
          />
        </div>
      }
    </>
  ) : null;
};

export default ProfileConfigurationGroupSection;
