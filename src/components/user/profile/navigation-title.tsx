import Button from "@/components/Button/button";
import { useUserNavigationContentContextProvider } from "@/context/user-navigation-content-context";

const NavigationTitles = () => {
  const { navigationSectionContent, updateNavigationSectionContent } =
    useUserNavigationContentContextProvider();

  const handleSwitchTabs = (key: string) => () => {
    const updatedNavigationSectionContent = new Map(navigationSectionContent);
    const currentValue = updatedNavigationSectionContent.get(key);
    if (currentValue && !currentValue.isActive) {
      updatedNavigationSectionContent.forEach((section, sectionKey) => {
        if (sectionKey === key) section.isActive = true;
        else section.isActive = false;
      });
    }
    updateNavigationSectionContent(updatedNavigationSectionContent);
  };



  return (
    <div className="flex gap-8 text-medium font-semibold pb-5">
      {Array.from(navigationSectionContent.keys()).map((navigationKey) => (
        <Button
          key={navigationKey}
          type="button"
          isActive={navigationSectionContent.get(navigationKey)!.isActive}
          isDisabled={false}
          onClick={handleSwitchTabs(navigationKey)}
        >
          <p
            className={`text-medium font-semibold text-skyBlue-800 ${
              navigationSectionContent.get(navigationKey)!.isActive
                ? "underline"
                : ""
            }`}
          >
            {navigationKey}
          </p>
        </Button>
      ))}
    </div>
  );
};
export default NavigationTitles;
