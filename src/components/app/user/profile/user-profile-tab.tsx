import Button from "@/components/global-components/Button/button";
import { useUserProfileContexts } from "@/context/user-profile-contexts";

const UserProfileTab = () => {
  const { userProfileData, updateCurrectActiveTab } =
    useUserProfileContexts();
    
  const handleNavigationTabClick = (key: string) => () => {
    updateCurrectActiveTab(key);
  };

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 relative">
      {Array.from(userProfileData.keys()).map((userInfoGroupKey) => (
        <div className="relative group" key={userInfoGroupKey}>
          <Button
            type="button"
            isActive={true}
            isDisabled={false}
            onClick={handleNavigationTabClick(userInfoGroupKey)}
            className={`relative px-6 py-3 text-medium font-semibold transition-all duration-300 ease-in-out
              ${
                userProfileData.get(userInfoGroupKey)!.isActive &&
                "text-sky-600 bg-gray-100 rounded-t-md"
              } hover:text-sky-600 ${
              !userProfileData.get(userInfoGroupKey)!.isActive &&
              "hover:bg-gray-50 hover:rounded-t-md"
            }`}
          >
            <p className="transition-all duration-300 ease-in-out hover:scale-110">
              {userProfileData.get(userInfoGroupKey)!.label}
            </p>
          </Button>
        </div>
      ))}
    </div>
  );
};
export default UserProfileTab;
