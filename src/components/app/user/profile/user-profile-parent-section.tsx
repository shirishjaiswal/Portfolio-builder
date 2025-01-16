import UserProfileParentActionButtons from "@/components/app/user/profile/user-profile-parent-action-buttons";
import {
  UserProfileDetailsParent,
} from "./types";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import UserProfileFieldSection from "./user-profile-field-section";

type UserProfileParentSectionProps = {
  parent: UserProfileDetailsParent;
  index : number;
};

const UserProfileParentSection: React.FC<UserProfileParentSectionProps> = ({
  parent,
  index
}) => {

  const {
    activeTab,
    updateParentIsCollapsed,
  } = useUserProfileContexts();


  const handleCollapsedSection = () => {
    updateParentIsCollapsed(parent.uniqueKey);
  };
  return (
    <div
      key={parent.uniqueKey}
      className="relative bg-gray-100 px-4 pb-4 pt-1 rounded-md group drop-shadow mx-2 mb-5 mt-3"
    >
      <div key={parent.uniqueKey} className="relative bg-gray-100 rounded-md">
        <button
          className="flex items-center font-semibold gap-2 w-full pt-2"
          onClick={handleCollapsedSection}
        >
          <p>{parent.label} - {parent.uniqueKey} - {index}</p>
        </button>
      </div>

      <div
        className={`flex gap-2 justify-center items-center absolute -top-2 -right-2 p-1.5 bg-white rounded-full ${
          parent.inEditMode
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        } shadow-sm border border-slate-300 transition-opacity duration-300 delay-110 drop-shadow-xl`}
      >
        <UserProfileParentActionButtons parent={parent} />
      </div>

      <div className={`mt-3 flex flex-wrap gap-x-6 ${parent.isCollapsed ? "hidden" : "block"}`}>
        {parent.userInfoFields.map((field) => (
          <UserProfileFieldSection
            key={field.uniqueKey}
            field={field}
            parentUniqueKey={parent.uniqueKey}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfileParentSection;
