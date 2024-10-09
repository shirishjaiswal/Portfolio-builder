import Button from "@/components/Button/button";
import ModalPopup from "@/components/Button/modalPopup";
import { useNavigationSectionContentProvider } from "@/context/navigation-section-content";
import { Input } from "@nextui-org/input";
import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { getCurrentSection } from "./navigation-section";

const NavigationTitles = () => {
  const {
    navigationSectionContent,
    addNavigationSectionContent,
    updateNavigationTitle,
    updateActiveNavigationTab,
  } = useNavigationSectionContentProvider();

  const [navigationTitle, setNavigationTitle] = useState<string>();

  const handleNavigationTabClick = (key: string) => () => {
    updateActiveNavigationTab(key);
    setNavigationTitle(navigationSectionContent.get(key)!.navigationName);
  };

  const addNewNavigationTabForm = (value?: string) => {
    return (
      <Input
        className="w-full text-roboto text-sm font-semibold"
        type="text"
        label={"Navigation Title"}
        labelPlacement="outside"
        placeholder="Enter Navigation Title"
        variant="underlined"
        isInvalid={false}
        errorMessage="Field cannot be empty"
        autoFocus
        autoCorrect="on"
        defaultValue={value}
        onChange={(e) => setNavigationTitle(e.target.value)}
      />
    );
  };
  const handleAddNewNavigationTab = () => {
    navigationTitle && addNavigationSectionContent(navigationTitle);

  };

  const handleEditNavigationTab = () => {
    navigationTitle &&
      updateNavigationTitle(
        getCurrentSection(navigationSectionContent) ?? "",
        navigationTitle
      );
  };

  return (
    <div className="flex gap-8 text-medium font-semibold pb-5">
      {Array.from(navigationSectionContent.keys()).map((navigationKey) => (
        <div className=" group" key={navigationKey}>
          <Button
            type="button"
            isActive={navigationSectionContent.get(navigationKey)!.isActive}
            isDisabled={false}
            onClick={handleNavigationTabClick(navigationKey)}
          >
            <p
              className={`text-medium font-semibold text-skyBlue-800 ${
                navigationSectionContent.get(navigationKey)!.isActive
                  ? "underline"
                  : ""
              }`}
            >
              {navigationSectionContent.get(navigationKey)!.navigationName}
            </p>
          </Button>
          <ModalPopup
            warningTitle="Edit Navigation Tab"
            warning={addNewNavigationTabForm(
              navigationSectionContent.get(navigationKey)!.navigationName
            )}
            className={`pl-3 opacity-0 ${
              navigationSectionContent.get(navigationKey)!.isActive
                ? "group-hover:opacity-100"
                : ""
            } transition-opacity duration-500 ease-in-out delay-500`}
            isActive={navigationSectionContent.get(navigationKey)!.isActive}
            onConfirm={handleEditNavigationTab}
          >
            <Pencil size={14} color="#334155" />
          </ModalPopup>
        </div>
      ))}

      <ModalPopup
        warningTitle="Add new Navigation Tab"
        warning={addNewNavigationTabForm()}
        onConfirm={handleAddNewNavigationTab}
        isActive
      >
        <CirclePlus size={16} color="#334155" />
      </ModalPopup>
    </div>
  );
};
export default NavigationTitles;
