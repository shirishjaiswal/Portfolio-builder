import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import {
  ParentSection,
  UserInfoField_OP,
  UserInfoGroup_OP,
  UserInfoParent_OP,
} from "./type";
import { useEffect, useState } from "react";
import { getActiveTab, getUniqueParentKey } from "./helper";
import { CirclePlus, Save } from "lucide-react";
import ProfileConfigurationParentSection from "@/components/app/user/profile-configuration/profile-configuration-parent-section";
import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import putUserInfoGroup from "@/utils/api-connections/admin/put-user-info-group";
import { useLoadingContext } from "@/context/loading-context";
import { toast } from "sonner";
import postUserInfoParent from "@/utils/api-connections/admin/post-user-info-parent";
import Loading from "@/components/loading/loading";
const changeConfigKeyAndRemoveId = (userInfoFields: UserInfoField_OP[]) => {
  return userInfoFields.map((userInfoField) => {
    return {
      ...userInfoField,
      configKey: getUniqueParentKey(),
      id: undefined,
    };
  });
};
const ProfileConfigurationGroupSection = () => {

  const { profileConfigurationData, addNewParentSection, unsavedChanges } =
    useProfileConfigurationContextProvider();

  const { updateIsLoading } = useLoadingContext();

  const [isSaving, setIsSaving] = useState(false);

  const [activeTab, setActiveTab] = useState<UserInfoGroup_OP | undefined>(
    undefined
  );

  useEffect(() => {
    setActiveTab(getActiveTab(profileConfigurationData) ?? undefined);
  }, [profileConfigurationData]);

  const [isAddNewSectionDialogBoxOpen, setIsAddNewSectionDIalogueBoxOpen] =
    useState<boolean>(false);

  const [addNewSectionFields, setAddNewSectionFields] = useState<ParentSection>(
    {
      configKey: "",
      label: "",
      description: "",
      multi: false,
      required: false,
      labelVisible: false,
    }
  );

  const handleIsAddNewSectionDialogBoxOpen = () => {
    if (isAddNewSectionDialogBoxOpen) {
      setAddNewSectionFields({
        configKey: "",
        label: "",
        description: "",
        multi: false,
        required: false,
        labelVisible: false,
      });
    }
    setIsAddNewSectionDIalogueBoxOpen(!isAddNewSectionDialogBoxOpen);
  };

  const handleAddNewParentSection = async (parent?: UserInfoParent_OP) => {
    if (
      (!parent && !addNewSectionFields.label) ||
      !activeTab ||
      !activeTab.id
    ) {
      toast.error("Missing required fields.");
      return;
    }

    // Generate a unique key and set defaults
    const uniqueKey = getUniqueParentKey(
      parent?.label || addNewSectionFields.label
    );

    const parentLabel = addNewSectionFields.label || `${parent?.label} - COPY`;
    const parentDescription =
      addNewSectionFields.description ?? parent?.description;
    const parentMulti = addNewSectionFields.multi ?? parent?.multi;
    const parentRequired = addNewSectionFields.required ?? parent?.required;
    const parentLabelVisible =
      addNewSectionFields.labelVisible ?? parent?.labelVisible;

    const parentUserInfoFields =
      addNewSectionFields.label && parent?.userInfoFields
        ? changeConfigKeyAndRemoveId(parent.userInfoFields)
        : [];

    const newUserInfoParent: UserInfoParent_OP = {
      configKey: uniqueKey,
      label: parentLabel,
      description: parentDescription,
      multi: parentMulti,
      required: parentRequired,
      labelVisible: parentLabelVisible,
      userInfoFields: parentUserInfoFields,
    };

    try {
      updateIsLoading(true);

      const response = await postUserInfoParent(
        newUserInfoParent,
        activeTab.id
      );
      if (!response?.data) {
        throw new Error(response?.error || "Failed to add the new section.");
      }

      addNewParentSection(activeTab.configKey, response.data);
      toast.success("Parent section added successfully.");
      handleIsAddNewSectionDialogBoxOpen();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsAddNewSectionDIalogueBoxOpen(false);
      updateIsLoading(false);
    }
  };

  const hasUnsavedChanges = () => {
    let hasUnsavedChanges = false;
    unsavedChanges?.get(activeTab!.configKey)?.forEach((parent) => {
      parent.field.size > 0 && (hasUnsavedChanges = hasUnsavedChanges || true);
    });
    return hasUnsavedChanges;
  };

  const handleSaveGroupChanges = async () => {
    setIsSaving(true);
    let response;
    try {
      response = await putUserInfoGroup(activeTab!);
      if (!response?.data) throw new Error(response?.error);
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSaving(false);
    }
  };
  
  console.log("profileConfigurationData", profileConfigurationData);

  return activeTab ? (
    <>
      <div className="flex justify-end w-full gap-2">
        <button
          className={`flex items-center justify-center space-x-1 -right-0 p-2 border transation-all rounded-full shadow-sm drop-shadow-xl transition duration-200 ease-in-out
    ${
      hasUnsavedChanges()
        ? "bg-gray-200 border-gray-200 cursor-not-allowed"
        : "bg-teal-500 border-slate00 hover:bg-teal-600"
    }
  h-12 min-w-40 mb-1`}
          onClick={handleSaveGroupChanges}
          id="save-changes-button"
          disabled={hasUnsavedChanges() || isSaving}
        >
          {!isSaving && (
            <>
              <Save color="#FFFFFF" size={20} />
              <p className="text-medium font-semibold text-white">
                Save Changes
              </p>
            </>
          )}
          {isSaving && (
            <div className="flex items-center gap-5 justify-center">
              <Loading
                spinColor="success"
                className="top-0.25"
                spinSize="sm"
                isBackdrop={false}
              />
              <p className="text-medium font-semibold text-white">Saving</p>
            </div>
          )}
        </button>
        <button
          className="bg-teal-500 flex items-center space-x-1 -right-0 hover:rounded-full p-2 border hover:bg-teal-600 transation-all rounded-full shadow-sm border-slate00 drop-shadow-xl transition duration-200 ease-in-out 
  h-12 min-w-40 mb-1"
          onClick={handleIsAddNewSectionDialogBoxOpen}
          id="add-new-field-button"
        >
          <CirclePlus color="#FFFFFF" size={20} />
          <p className="text-medium font-semibold text-white">
            Add New Section
          </p>
        </button>
      </div>
      <div className="h-[726px] overflow-y-auto">
        {activeTab.userInfoParents.map((parent) => (
          <ProfileConfigurationParentSection
            key={parent.configKey}
            parent={parent}
            group={activeTab}
            handleAddNewParentSection={handleAddNewParentSection}
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
                onClick: handleAddNewParentSection,
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
                type: "checkbox",
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
                type: "checkbox",
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
                type: "checkbox",
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
