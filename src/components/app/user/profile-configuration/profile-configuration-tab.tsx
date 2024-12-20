import Button from "@/components/global-components/Button/button";
import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import { getActiveTab } from "./helpet";
import { validateString } from "@/utils/validation/input";

const ProfileConfigurationTab = () => {
  const {
    profileConfigurationData,
    updateCurrectActiveTab,
    removeProfileConfigurationTab,
    addNewProfileConfigurationTab,
    updateProfileConfigurationTabLable,
  } = useProfileConfigurationContextProvider();

  const [navigationTitle, setNavigationTitle] = useState<string>();
  const [navigationTabDescription, setNavigationTabDescription] =
    useState<string>();
  const [isTabDialogBoxOpen, setIsTabDialogBoxOpen] = useState(false);
  const [isAddDialogBoxOpen, setIsAddDialogBoxOpen] = useState(false);

  console.log(profileConfigurationData);
  const closeDialogBox = () => {
    setIsTabDialogBoxOpen(false);
    setIsAddDialogBoxOpen(false);
    setNavigationTabDescription("");
    setNavigationTitle("");
  };

  const updateIsTabDialogBoxOpen = (value: boolean) => {
    setNavigationTitle(getActiveTab(profileConfigurationData)?.label);
    setNavigationTabDescription(
      getActiveTab(profileConfigurationData)?.description
    );
    setIsTabDialogBoxOpen(value);
  };

  const handleNavigationTabClick = (key: string) => () => {
    updateCurrectActiveTab(key);
  };

  const handleDeleteProfileConfigurationTab = (key: string) => () => {
    const keys = Array.from(profileConfigurationData.keys());
    updateCurrectActiveTab(keys[keys.length - 2]);
    removeProfileConfigurationTab(key);
    closeDialogBox();
  };

  const handleAddNewProfileCongigurationTab = () => {
    const isNavigationTitleEmpty = validateString(navigationTitle);
    const isNavigationTabDescriptionEmpty = validateString(
      navigationTabDescription
    );

    if (
      !isNavigationTitleEmpty ||
      !isNavigationTabDescriptionEmpty ||
      !navigationTitle ||
      !navigationTabDescription
    ) {
      return;
    }
    addNewProfileConfigurationTab(navigationTitle, navigationTabDescription);
    closeDialogBox();
  };

  const handleEditNavigationTab = () => {
    const isNavigationTitleEmpty = validateString(navigationTitle);
    if (!isNavigationTitleEmpty || !navigationTitle) {
      return;
    }

    updateProfileConfigurationTabLable(
      getActiveTab(profileConfigurationData)!.uniqueKey ?? "",
      navigationTitle
    );
    closeDialogBox();
  };

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 relative">
      {Array.from(profileConfigurationData.keys()).map((userInfoGroupKey) => (
        <div className="relative group" key={userInfoGroupKey}>
          <Button
            type="button"
            isActive={true}
            isDisabled={false}
            onClick={handleNavigationTabClick(userInfoGroupKey)}
            className={`relative px-6 py-3 text-medium font-semibold transition-all duration-300 ease-in-out
              ${
                profileConfigurationData.get(userInfoGroupKey)!.isActive &&
                "text-sky-600 bg-gray-100 rounded-t-md"
              } hover:text-sky-600 hover:bg-gray-50 hover:rounded-t-md`}
          >
            <p className="transition-all duration-300 ease-in-out hover:scale-110">
              {profileConfigurationData.get(userInfoGroupKey)!.label}
            </p>
          </Button>
          {isTabDialogBoxOpen &&
            profileConfigurationData.get(userInfoGroupKey)?.isActive && (
              <DialogBox
                title={"Edit Navigation"}
                inputFields={[
                  {
                    id: "navigationTabLabel",
                    label: "Label",
                    type: "text",
                    placeholder: "Enter Navigation Title",
                    value: navigationTitle,
                    onChange: (e) => setNavigationTitle(e.target.value.trim()),
                  },
                  {
                    id: "navigationTabDescription",
                    label: "Description",
                    type: "text",
                    placeholder: "Enter Navigation Description",
                    value: navigationTabDescription,
                    onChange: (e) =>
                      setNavigationTabDescription(e.target.value.trim()),
                  },
                ]}
                buttons={[
                  {
                    label: "Delete",
                    type: "red",
                    onClick:
                      handleDeleteProfileConfigurationTab(userInfoGroupKey),
                  },
                  {
                    label: "Update",
                    type: "blue",
                    onClick: handleEditNavigationTab,
                  },
                ]}
                isOpen={
                  profileConfigurationData.get(userInfoGroupKey)!.isActive ??
                  false
                }
                onClose={closeDialogBox}
              />
            )}
          {profileConfigurationData.get(userInfoGroupKey)!.isActive && (
            <button
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm border border-slate-300 drop-shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                updateIsTabDialogBoxOpen(true);
              }}
            >
              <Pencil size={18} color="#0369a1" />
            </button>
          )}
        </div>
      ))}
      {isAddDialogBoxOpen && (
        <DialogBox
          title={"Add New Navigation Section"}
          subtitle={"Enter Navigation Title"}
          inputFields={[
            {
              id: "navigationTitle",
              label: "Navigation Title",
              type: "text",
              placeholder: "Enter Navigation Title",
              value: navigationTitle,
              onChange: (e) => setNavigationTitle(e.target.value),
            },
            {
              id: "tabDescription",
              label: "Description",
              type: "text",
              placeholder: "Enter Description",
              value: navigationTabDescription,
              onChange: (e) => setNavigationTabDescription(e.target.value),
            },
          ]}
          buttons={[
            {
              label: "Cancel",
              type: "gray",
              onClick: closeDialogBox,
            },
            {
              label: "Save",
              type: "blue",
              onClick: handleAddNewProfileCongigurationTab,
            },
          ]}
          isOpen={isAddDialogBoxOpen}
          onClose={closeDialogBox}
        />
      )}
      <button
        onClick={() => setIsAddDialogBoxOpen(true)}
        className="ml-4 px-4 py-2 text-gray-600 bg-gray-100 hover:text-white rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200 hover:drop-shadow-lg"
      >
        <CirclePlus size={18} color="#64748b" />
      </button>
    </div>
  );
};
export default ProfileConfigurationTab;
