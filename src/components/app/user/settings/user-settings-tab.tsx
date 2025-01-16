import Button from "@/components/global-components/Button/button";
import { useUserSettingsContext } from "@/context/user-settings-context";

export const userSettingsTab = [
  {
    id: "profile-settings",
    label: "Profile",
  },
  {
    id: "account-settings",
    label: "Account",
  },
];

const UserSettingsTab: React.FC = () => {
  const {activeSettingsTab, updateActiveSettingsTab } =
    useUserSettingsContext();
  return (
    <>
      <div className="flex items-center gap-2 border-b border-gray-200 relative">
        {userSettingsTab.map((tab) => (
          <div className="relative group" key={tab.id}>
            <Button
              type="button"
              isActive={activeSettingsTab?.id === tab.id}
              isDisabled={false}
              onClick={() => updateActiveSettingsTab(tab)}
              className={`relative px-6 py-3 text-medium font-semibold transition-all duration-300 ease-in-out
              ${
                activeSettingsTab?.id === tab.id
                  ? "text-sky-600 bg-gray-100 rounded-t-md"
                  : "hover:bg-gray-50 hover:rounded-t-md"
              } hover:text-sky-600 `}
            >
              <p className="transition-all duration-300 ease-in-out hover:scale-110">
                {tab.label}
              </p>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserSettingsTab;
