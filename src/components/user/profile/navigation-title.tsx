import Button from "@/components/Button/button";
import { useUSerProfileContextProvider } from "@/context/user-profile-context";

const NavigationTitles = () => {
  const { userProfile, setActiveNavigationTab } =
    useUSerProfileContextProvider();

  const handleSwitchTabs = (key: string) => () => {
    setActiveNavigationTab(key);
  };

  return (
    <div className="flex gap-8 text-medium font-semibold pb-2">
      {Array.from(userProfile.keys()).map((navigationKey) => (
        <Button
          key={navigationKey}
          type="button"
          isActive={userProfile.get(navigationKey)!.isActive}
          isDisabled={false}
          onClick={handleSwitchTabs(navigationKey)}
        >
          <p
            className={`text-medium font-semibold text-skyBlue-800 ${
              userProfile.get(navigationKey)!.isActive ? "underline" : ""
            } hover:text-skyBlue-600 hover:underline`}
          >
            {userProfile.get(navigationKey)!.navigationName}
          </p>
        </Button>
      ))}
    </div>
  );
};
export default NavigationTitles;
