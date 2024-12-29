import {
  ParentSection,
  UserInfoField_OP,
  UserInfoGroup_OP,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";
import Badge from "@/components/global-components/badge/badge";
import { useEffect, useState } from "react";
import ProfileConfigurationFieldSection from "./profile-configuration-field-section";
import ParentSectionActionButtons from "./parent-section-action-buttons";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { CirclePlus } from "lucide-react";
import ProfileConfigurationParentEditSection from "./profile-configuration-parent-edit-section";
import postUserInfoField from "@/utils/api-connections/admin/post-user-info-field";
import { getUniqueFieldKey } from "./helper";
import { toast } from "sonner";
import Loading from "@/components/loading/loading";

type ProfileConfigurationParentSectionProps = {
  parent: UserInfoParent_OP;
  group: UserInfoGroup_OP;
  handleAddNewParentSection: (parent?: UserInfoParent_OP) => void;
};

const ProfileConfigurationParentSection: React.FC<
  ProfileConfigurationParentSectionProps
> = ({
  parent,
  group,
  handleAddNewParentSection,
}: ProfileConfigurationParentSectionProps) => {
  const { unsavedChanges, addNewTextField, updateParentSection, deleteField } =
    useProfileConfigurationContextProvider();

  const [isAddingNewField, setIsAddingNewField] = useState(false);

  const [editParentSectionData, setEditParentSectionData] =
    useState<ParentSection>({
      id: parent.id,
      configKey: parent.configKey,
      label: parent.label,
      description: parent.description,
      multi: parent.multi,
      required: parent.required,
      labelVisible: parent.labelVisible,
    });

  const [currentParent, setCurrentParent] = useState(parent);

  useEffect(() => {
    setEditParentSectionData({
      id: parent.id,
      configKey: parent.configKey,
      label: parent.label,
      description: parent.description,
      multi: parent.multi,
      required: parent.required,
      labelVisible: parent.labelVisible,
    });
  }, [parent]);

  const handleCollapsedSection = () => {
    setCurrentParent((prev) => ({ ...prev, isCollapsed: !prev.isCollapsed }));
  };

  const handleSaveEditParentFields = () => {
    setCurrentParent({
      ...currentParent,
      label: editParentSectionData.label,
      description: editParentSectionData.description,
      multi: editParentSectionData.multi,
      required: editParentSectionData.required,
      labelVisible: editParentSectionData.labelVisible,
      inEditMode: false,
    });
    updateParentSection(
      group.configKey,
      parent.configKey,
      editParentSectionData
    );
  };

  const handleCancleEditParentFields = () => {
    setEditParentSectionData({
      id: parent.id,
      configKey: parent.configKey,
      label: parent.label,
      description: parent.description,
      multi: parent.multi,
      required: parent.required,
      labelVisible: parent.labelVisible,
    });
    setCurrentParent({
      ...parent,
      inEditMode: false,
    });
  };

  const addNewField = async () => {
    setIsAddingNewField(true);
    try {
      if (!group.id || !parent.id) return;
      const uniqueKey = getUniqueFieldKey();
      const userInfoField: UserInfoField_OP = {
        configKey: uniqueKey,
        label: "Text Field",
        description: "",
        input: "TEXT",
        required: false,
        hasMultiSelection: false,
        options: [],
        startDate: false,
        endDate: false,
      };
      const response = await postUserInfoField(
        userInfoField,
        parent.id,
        group.id
      );
      if (!response?.data) throw new Error(response?.error);
      addNewTextField(group.configKey, parent.configKey, response.data);
      setCurrentParent({
        ...currentParent,
        userInfoFields: [...currentParent.userInfoFields, response.data],
      })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsAddingNewField(false);
    }
  };

  const isUnsavedChangesBadgeVisible = () => {
    const groupUnsavedChanges = unsavedChanges?.get(group.configKey);
    let parentUnsavedChanges;
    if (groupUnsavedChanges !== undefined)
      parentUnsavedChanges = groupUnsavedChanges.get(parent.configKey);
    if (
      (parentUnsavedChanges !== undefined &&
        parentUnsavedChanges.field.size > 0) ||
      parentUnsavedChanges?.parentHasUnsavedChanges
    )
      return true;
    return false;
  };

  const deleteFieldFromMain = (fieldKey: string) => {
    setCurrentParent({
      ...currentParent,
      userInfoFields: currentParent.userInfoFields.filter((field) => field.configKey !== fieldKey),
    })
    deleteField(group.configKey, parent.configKey, fieldKey);
  }
  
  return (
    <div
      key={currentParent.configKey}
      className="relative bg-gray-100 px-4 pb-4 pt-1 rounded-md group drop-shadow mx-2 mb-5 mt-3"
    >
      <div
        key={currentParent.configKey}
        className="relative bg-gray-100 rounded-md"
      >
        {!currentParent.inEditMode && (
          <button
            className={`flex items-center font-semibold gap-2 w-full pt-2`}
            onClick={handleCollapsedSection}
          >
            <p>{currentParent.label}</p>
            {currentParent.required && (
              <Badge text="Required" color="red" type="secondary" size="xs" />
            )}
            {currentParent.multi ? (
              <Badge text="Multi" color="skyblue" type="secondary" size="xs" />
            ) : (
              <Badge
                text="Non-Multi"
                color="skyblue"
                type="secondary"
                size="xs"
              />
            )}
            {currentParent.labelVisible && (
              <Badge text="Visible" color="green" type="secondary" size="xs" />
            )}
            {isUnsavedChangesBadgeVisible() && (
              <Badge
                text="Unsaved Changes"
                color="red"
                type="primary"
                size="xs"
              />
            )}
          </button>
        )}

        {!parent.inEditMode && (
          <ProfileConfigurationParentEditSection
            parent={currentParent}
            editParentSectionData={editParentSectionData}
            setEditParentSectionData={setEditParentSectionData}
          />
        )}
      </div>

      <div
        className={`flex gap-2 justify-center items-center absolute -top-2 -right-2 p-1.5 bg-white rounded-full ${
          parent.inEditMode ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 shadow-sm border-slate00 border transition-opacity duration-300 delay-110 drop-shadow-xl`}
      >
        <ParentSectionActionButtons
          parent={currentParent}
          setCurrentParent={setCurrentParent}
          handleSaveEditParentFields={handleSaveEditParentFields}
          handleCancleEditParentFields={handleCancleEditParentFields}
          handleAddNewParentSection={handleAddNewParentSection}
        />
      </div>

      <div
        className={` ${currentParent.isCollapsed ? "hidden" : "block"} mt-3`}
      >
        {currentParent.userInfoFields.map((field) => (
          <ProfileConfigurationFieldSection
            key={field.configKey}
            field={field}
            groupUniqueKey={group.configKey}
            parentUniqueKey={currentParent.configKey}
            deleteField={deleteFieldFromMain}
          />
        ))}
      </div>
      <div
        className={`flex gap-1 justify-center items-center absolute -bottom-2 -right-2 p-1.5 bg-white border text-teal-500 hover:bg-teal-50 hover:border-teal-500 transation-all rounded-full shadow-sm border-slate00  drop-shadow-xl hover:rounded-full ${
          currentParent.isCollapsed
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
          {!isAddingNewField && (
            <>
              <CirclePlus color="#14b8a6" size={20} />
              <p className="text-sm font-semibold ">Add Field</p>
            </>
          )}
          {isAddingNewField && (
            <div className="flex items-center gap-2 justify-center">
              <Loading className="top-0.25" spinSize="sm" isBackdrop={false} />
              <p className="text-sm font-semibold">Adding New Field</p>
            </div>
          )}
        </button>
      </div>
      <div
        className={`flex-col ${
          parent.userInfoFields.length <= 0 ? "flex" : "hidden"
        } ${
          parent.inEditMode ? "hidden" : "block"
        } gap-1 justify-center items-center`}
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
            disabled={isAddingNewField}
          >
            {!isAddingNewField && (
              <>
                <CirclePlus color="#14b8a6" size={20} />
                <p className="text-sm font-semibold ">Add Field</p>
              </>
            )}
            {isAddingNewField && (
              <div className="flex items-center gap-2 justify-center">
                <Loading
                  spinColor="primary"
                  className="top-0.25"
                  spinSize="sm"
                  isBackdrop={false}
                />
                <p className="text-sm font-semibold">Adding New Field</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileConfigurationParentSection;
