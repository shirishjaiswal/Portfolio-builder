import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import {
  CircleCheckBig,
  CircleChevronDown,
  CircleX,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  ParentSection,
  UserInfoGroup_OP,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";
import { useEffect, useState } from "react";
import { getActiveTab } from "@/components/app/user/profile-configuration/helpet";

type ParentSectionActionButtonsProps = {
  parent: UserInfoParent_OP;
  editParentSectionData: ParentSection | null;
  setEditParentSectionData: (
    editParentSectionData: ParentSection | null
  ) => void;
};

const ParentSectionActionButtons: React.FC<ParentSectionActionButtonsProps> = ({
  parent,
  editParentSectionData,
  setEditParentSectionData,
}: ParentSectionActionButtonsProps) => {
  const {
    profileConfigurationData,
    updateParentInEditMode,
    updateParentIsCollapsed,
    updateParentSection,
    deleteParent,
    duplicateParentSection
  } = useProfileConfigurationContextProvider();

  const [activeTab, setActiveTab] = useState<UserInfoGroup_OP | undefined>(
    undefined
  );

  useEffect(() => {
    setActiveTab(getActiveTab(profileConfigurationData) ?? undefined);
  }, [profileConfigurationData, updateParentInEditMode]);

  const handleParentIsEditMode = (parentUniqueKey: string) => {
    setEditParentSectionData({
      id: parent.id,
      uniqueKey: parent.uniqueKey,
      label: parent.label,
      multi: parent.multi,
      description: parent.description,
      required: parent.required,
      labelVisible: parent.labelVisible,
    });
    updateParentInEditMode(activeTab!.uniqueKey, parentUniqueKey);
  };

  const handleDuplicateParent = (parentUniqueKey: string) => {
    duplicateParentSection(activeTab!.uniqueKey, parentUniqueKey);
  };

  const handleUpdateParentData = (parentUniqueKey: string) => {
    const tempEditParentSectionData: ParentSection = {
      ...editParentSectionData,
      id: parent.id,
      uniqueKey: parent.uniqueKey,
      label: editParentSectionData!.label || parent.label,
      description: editParentSectionData!.description || parent.description,
      multi: editParentSectionData!.multi,
      required: editParentSectionData!.required,
      labelVisible: editParentSectionData!.labelVisible,
    };
    updateParentSection(
      activeTab!.uniqueKey,
      parentUniqueKey,
      tempEditParentSectionData!
    );
    setEditParentSectionData(null);
  };

  const handleCollapsedSection = (parentUniqueKey: string) => {
    updateParentIsCollapsed(activeTab!.uniqueKey, parentUniqueKey);
  };

  const handleDeleteParent = (parentUniqueKey: string) => {
    deleteParent(activeTab!.uniqueKey, parentUniqueKey);
  };

  const handleUndoChanges = () => {
    setEditParentSectionData({
      id: parent.id,
      uniqueKey: parent.uniqueKey,
      label: parent.label,
      multi: parent.multi,
      description: parent.description,
      required: parent.required,
      labelVisible: parent.labelVisible,
    });
    updateParentInEditMode(activeTab!.uniqueKey, parent.uniqueKey);
    setEditParentSectionData(null);
  };
  return (
    <>
      {!parent.inEditMode ? (
        <button
          className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
          onClick={() => handleParentIsEditMode(parent.uniqueKey)}
          id="edit-button"
        >
          <Pencil size={18} color="#0369a1" />
        </button>
      ) : (
        <>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={() => handleUpdateParentData(parent.uniqueKey)}
            id="save-button"
          >
            <CircleCheckBig size={18} color="#15803d" />
          </button>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleUndoChanges}
            id="save-button"
          >
            <CircleX size={18} color="#be123c" />
          </button>
        </>
      )}
      {!parent.inEditMode && (
        <>
        <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={() => handleDuplicateParent(parent.uniqueKey)}
            id="copy-button"
          >
            <Copy size={18} color="#3730a3" />
          </button>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={() => handleDeleteParent(parent.uniqueKey)}
            id="delete-button"
          >
            <Trash2 size={18} color="#be123c" />
          </button>
          <button
            className={`transition-transform duration-300 hover:scale-150 hover:rounded-full hidden ${
              parent.isCollapsed &&
              "rotate-180 transform transition-all duration-300"
            }`}
            onClick={() => handleCollapsedSection(parent.uniqueKey)}
            id="collapse-button"
          >
            <CircleChevronDown color="#3f3f46" size={18} />
          </button>
        </>
      )}
    </>
  );
};

export default ParentSectionActionButtons;
