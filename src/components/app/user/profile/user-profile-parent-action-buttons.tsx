import { CircleChevronDown, Copy, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import { UserProfileDetailsParent, UserProfileDetilsGroup } from "./types";
import { getActiveTab, getUniqueFieldKey, getUniqueParentKey } from "./helper";

type UserProfileParentActionButtonsProps = {
  group: UserProfileDetilsGroup;
  parent: UserProfileDetailsParent;
  setCurrentTab: (tab: UserProfileDetilsGroup) => void;
};

const UserProfileParentActionButtons: React.FC<
  UserProfileParentActionButtonsProps
> = ({ group, parent, setCurrentTab }: UserProfileParentActionButtonsProps) => {
  const {
    userProfileData,
    updateParentIsCollapsed,
    deleteParent,
    duplicateParentSection,
  } = useUserProfileContexts();

  const [activeTab, setActiveTab] = useState<
    UserProfileDetilsGroup | undefined
  >(undefined);

  const [isDelete, setIsDelete] = useState(true);

  useEffect(() => {
    const currentActiveTab = getActiveTab(userProfileData);
    setActiveTab(currentActiveTab ?? undefined);

    const filteredParents = currentActiveTab?.userInfoParents.filter(
      (parentData) => parentData.configKey === parent.configKey
    );
    if (!filteredParents) setIsDelete(false);
    else if (filteredParents[0]?.uniqueKey === parent.uniqueKey)
      setIsDelete(false);
  }, [userProfileData, parent]);

  const handleDuplicateParent = (parentUniqueKey: string) => {
    const parentToCopy = group.userInfoParents.find(
      (field) => field.uniqueKey === parentUniqueKey
    );
    
    if (!parentToCopy) return;
  
    const newParent = {
      ...parentToCopy, 
      uniqueKey: getUniqueParentKey(), 
      userInfoFields: parentToCopy.userInfoFields.map((field) => ({
        ...field,
        uniqueKey: getUniqueFieldKey(),
        value: {
          inputValueArray: [],
          inputValue: "",
          startDate: null,
          endDate: null,
          onGoing: false,
        }, 
      })),
    };
  
    setCurrentTab({
      ...group,
      userInfoParents: [...group.userInfoParents, newParent],
    });
  };
  
  
  const handleCollapsedSection = (parentUniqueKey: string) => {
    updateParentIsCollapsed(activeTab!.configKey, parentUniqueKey);
  };

  const handleDeleteParent = (parentUniqueKey: string) => {
    deleteParent(activeTab!.configKey, parentUniqueKey);
  };

  return (
    <>
      {parent.multi && (
        <button
          className={`transition-transform duration-300 hover:scale-150 hover:rounded-full`}
          onClick={() => handleDuplicateParent(parent.uniqueKey)}
          id="copy-button"
        >
          <Copy size={18} color="#3730a3" />
        </button>
      )}

      {isDelete && (
        <button
          className={`transition-transform duration-300 hover:scale-150 hover:rounded-full`}
          onClick={() => handleDeleteParent(parent.uniqueKey)}
          id="delete-button"
        >
          <Trash2 size={18} color="#e11d48" />
        </button>
      )}
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
  );
};

export default UserProfileParentActionButtons;
