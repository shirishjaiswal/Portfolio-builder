import { useUserSettingsContext } from "@/context/user-settings-context";
import ProfileSettings from "@/components/app/user/settings/profile-settings";
import AccountSettings from "@/components/app/user/settings/account-settings";

const UserSettingsSection = () => {
  const { activeSettingsTab } =
    useUserSettingsContext();

  if (!activeSettingsTab) return null;

  return (
    <>
      {activeSettingsTab.id === "profile-settings" && <ProfileSettings />}
      {activeSettingsTab.id === "account-settings" && <AccountSettings />}
    </>
  );
};

export default UserSettingsSection;
