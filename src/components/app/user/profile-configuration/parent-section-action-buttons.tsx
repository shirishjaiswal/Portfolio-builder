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
  UserInfoGroup_OP,
  UserInfoParent_OP,
} from "@/components/app/user/profile-configuration/type";
import { useEffect, useState } from "react";
import { getActiveTab } from "@/components/app/user/profile-configuration/helper";

type ParentSectionActionButtonsProps = {
  parent: UserInfoParent_OP;
  setCurrentParent: (parent: UserInfoParent_OP) => void;
  handleAddNewParentSection: (parent?: UserInfoParent_OP) => void;
  handleSaveEditParentFields: () => void;
  handleCancleEditParentFields: () => void;
};

const ParentSectionActionButtons: React.FC<ParentSectionActionButtonsProps> = ({
  parent,
  setCurrentParent,
  handleAddNewParentSection,
  handleSaveEditParentFields,
  handleCancleEditParentFields,
}: ParentSectionActionButtonsProps) => {
  const { profileConfigurationData, deleteParent } =
    useProfileConfigurationContextProvider();

  const [activeTab, setActiveTab] = useState<UserInfoGroup_OP | undefined>(
    undefined
  );

  useEffect(() => {
    setActiveTab(getActiveTab(profileConfigurationData) ?? undefined);
  }, [profileConfigurationData]);

  const handleParentIsEditMode = () => {
    setCurrentParent({
      ...parent,
      inEditMode: true,
      isCollapsed: true,
    });
  };

  const handleDuplicateParent = async () => {
    if (!parent) return;
    await handleAddNewParentSection(parent);
  };

  const handleCollapsedSection = () => {
    setCurrentParent({
      ...parent,
      isCollapsed: !parent.isCollapsed,
    });
  };

  const handleDeleteParent = () => {
    deleteParent(activeTab!.configKey, parent.configKey);
  };

  return (
    <>
      {!parent.inEditMode ? (
        <button
          className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
          onClick={handleParentIsEditMode}
          id="edit-button"
        >
          <Pencil size={18} color="#0369a1" />
        </button>
      ) : (
        <>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleSaveEditParentFields}
            id="save-button"
          >
            <CircleCheckBig size={18} color="#15803d" />
          </button>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleCancleEditParentFields}
            id="cancle-button"
          >
            <CircleX size={18} color="#be123c" />
          </button>
        </>
      )}
      {!parent.inEditMode && (
        <>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleDuplicateParent}
            id="copy-button"
          >
            <Copy size={18} color="#3730a3" />
          </button>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleDeleteParent}
            id="delete-button"
          >
            <Trash2 size={18} color="#be123c" />
          </button>
          <button
            className={`transition-transform duration-300 hover:scale-150 hover:rounded-full hidden ${
              parent.isCollapsed &&
              "rotate-180 transform transition-all duration-300"
            }`}
            onClick={handleCollapsedSection}
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
