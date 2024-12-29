import UserProfileParentActionButtons from "./user-profile-parent-action-buttons";
import UserProfileFieldSection from "./user-profile-field-section";
import { UserProfileDetailsParent, UserProfileDetilsGroup } from "./types";
import { useEffect, useState } from "react";

type UserProfileParentSectionProps = {
  parent: UserProfileDetailsParent;
  group: UserProfileDetilsGroup;
  setCurrentTab: (tab: UserProfileDetilsGroup) => void;
};
const UserProfileParentSection = ({
  parent,
  group,
  setCurrentTab,
}: UserProfileParentSectionProps) => {

  const [currentParent, setCurrentParent] = useState<UserProfileDetailsParent>(parent);

  useEffect(() => {
    setCurrentParent(parent);
  }, [parent, setCurrentParent]);

  const handleCollapsedSection = (parentUniqueKey: string) => {
    setCurrentTab({
      ...group,
      userInfoParents: group.userInfoParents.map((parent) => ({
        ...parent,
        isCollapsed: parent.uniqueKey === parentUniqueKey ? !parent.isCollapsed : parent.isCollapsed,
      })),
    })
  };

  return (
    <>
      <div
        key={currentParent.configKey}
        className="relative bg-gray-100 px-4 pb-4 pt-1 rounded-md group drop-shadow mx-2 mb-5 mt-3"
      >
        <div key={currentParent.configKey} className="relative bg-gray-100 rounded-md">
          { 
            <button
              className={`flex items-center font-semibold gap-2 w-full pt-2`}
              onClick={() => handleCollapsedSection(currentParent.uniqueKey)}
            >
              <p>{currentParent.label}</p>
            </button>
          }
        </div>
        <div
          className={`flex gap-2 justify-center items-center absolute -top-2 -right-2 p-1.5 bg-white rounded-full ${
            currentParent.inEditMode
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          } shadow-sm border border-slate-300 transition-opacity duration-300 delay-110 drop-shadow-xl`}
        >
          <UserProfileParentActionButtons
            group={group}
            parent={currentParent}
            setCurrentTab={setCurrentTab}
          />
        </div>
        <div
          className={` ${
            parent.isCollapsed ? "hidden" : "block"
          } mt-3 flex flex-wrap flex-grow gap-x-6`}
        >
          {currentParent.userInfoFields.map((field) => (
            <UserProfileFieldSection
              key={field.configKey}
              field={field}
              group={group}
              parentUniqueKey={currentParent.uniqueKey}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfileParentSection;
