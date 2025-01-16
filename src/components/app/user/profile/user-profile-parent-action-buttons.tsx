import { CircleChevronDown, Copy, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import { UserProfileDetailsParent } from "@/components/app/user/profile/types";

type UserProfileParentActionButtonsProps = {
  parent: UserProfileDetailsParent;
};

const UserProfileParentActionButtons: React.FC<UserProfileParentActionButtonsProps> = ({
  parent,
}) => {
  const {
    userProfileData,
    activeTab,
    updateParentIsCollapsed,
    deleteParent,
    duplicateParentSection,
  } = useUserProfileContexts();

  const [isDelete, setIsDelete] = useState(true);

  useEffect(() => {
    const filteredParents = activeTab?.userInfoParents.filter(
      (parentData) => parentData.configKey === parent.configKey
    );
    if(!filteredParents) return
    setIsDelete(filteredParents && filteredParents[0]?.uniqueKey !== parent.uniqueKey);
  }, [userProfileData, parent]);

  const handleDuplicateParent = (parentUniqueKey: string) => {
    duplicateParentSection(activeTab!.configKey, parentUniqueKey);
  };
  
  const handleCollapsedSection = () => {
    updateParentIsCollapsed(parent.uniqueKey);
  };

  const handleDeleteParent = () => {
    deleteParent(activeTab!.configKey, parent.uniqueKey);
  };

  return (
    <>
      {parent.multi && (
        <button
          className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
          onClick={() => handleDuplicateParent(parent.uniqueKey)}
          id="copy-button"
        >
          <Copy size={18} color="#3730a3" />
        </button>
      )}

      {isDelete && (
        <button
          className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
          onClick={handleDeleteParent}
          id="delete-button"
        >
          <Trash2 size={18} color="#e11d48" />
        </button>
      )}

      <button
        className={`transition-transform duration-300 hover:scale-150 hover:rounded-full hidden ${
          parent.isCollapsed && "rotate-180 transform transition-all duration-300"
        }`}
        onClick={handleCollapsedSection}
        id="collapse-button"
      >
        <CircleChevronDown color="#3f3f46" size={18} />
      </button>
    </>
  );
};

export default UserProfileParentActionButtons;
