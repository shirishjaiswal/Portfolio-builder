import Button from "@/components/global-components/Button/button";
import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import { getActiveTab, getUniqueGroupKey } from "./helper";
import { validateString } from "@/utils/validation/input";
import deleteUserInfoGroup from "@/utils/api-connections/admin/delete-user-info-group";
import { useLoadingContext } from "@/context/loading-context";
import { toast } from "sonner";
import { UserInfoGroup_OP } from "./type";
import postUserInfoGroup from "@/utils/api-connections/admin/post-user-info-group";

const ProfileConfigurationTab = () => {
  const {
    profileConfigurationData,
    updateCurrectActiveTab,
    removeProfileConfigurationTab,
    addNewProfileConfigurationTab,
    updateProfileConfigurationTabLable,
  } = useProfileConfigurationContextProvider();

  const { updateIsLoading } = useLoadingContext();

  const [navigationTitle, setNavigationTitle] = useState<string>();
  const [navigationTabDescription, setNavigationTabDescription] =
    useState<string>();
  const [navigationTabVisible, setNavigationTabVisible] =
    useState<boolean>(true);

  const [isTabDialogBoxOpen, setIsTabDialogBoxOpen] = useState(false);
  const [isAddDialogBoxOpen, setIsAddDialogBoxOpen] = useState(false);

  const closeDialogBox = () => {
    setIsTabDialogBoxOpen(false);
    setIsAddDialogBoxOpen(false);
    setNavigationTabDescription("");
    setNavigationTitle("");
    setNavigationTabVisible(true);
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

  const handleDeleteProfileConfigurationTab = (key: string) => async () => {
    updateIsLoading(true);
    let response;
    try {
      const userInfoGroup = getActiveTab(profileConfigurationData);
      const userInfoGroupId = userInfoGroup?.id;
      if (userInfoGroupId)
        response = await deleteUserInfoGroup(userInfoGroupId);
      if (userInfoGroupId && !response?.data)
        throw new Error("Failed to delete");
      toast.success("Deleted successfully");

      const keys = Array.from(profileConfigurationData.keys());

      if (keys[0] === userInfoGroup?.configKey) {
        updateCurrectActiveTab(keys[1]);
      } else if (keys[keys.length - 1] === userInfoGroup?.configKey) {
        updateCurrectActiveTab(keys[keys.length - 2]);
      } else {
        keys.forEach((key) => {
          if (key === userInfoGroup?.configKey) {
            updateCurrectActiveTab(keys[keys.indexOf(key) + 1]);
          }
        });
      }
      updateCurrectActiveTab(keys[keys.length - 2]);
      removeProfileConfigurationTab(key);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      closeDialogBox();
      updateIsLoading(false);
    }
  };

  const handleAddNewProfileCongigurationTab = async () => {
    const isNavigationTitleEmpty = validateString(navigationTitle);

    if (
      !isNavigationTitleEmpty ||
      !navigationTitle
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const uniqueKey = getUniqueGroupKey(navigationTitle);
    const newUserInfoGroup: UserInfoGroup_OP = {
      position: profileConfigurationData.size,
      configKey: uniqueKey,
      label: navigationTitle,
      description: navigationTabDescription ?? "",
      userInfoParents: [],
      visible: navigationTabVisible ? true : false,
    };

    let response;
    try {
      updateIsLoading(true);
      response = await postUserInfoGroup(newUserInfoGroup);
      if (!response?.data) throw new Error(response?.error);
      addNewProfileConfigurationTab(response.data);
      toast.success("Added successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add");
    } finally {
      closeDialogBox();
      updateIsLoading(false);
    }
  };

  const handleEditNavigationTab = () => {
    const isNavigationTitleEmpty = validateString(navigationTitle);
    if (!isNavigationTitleEmpty || !navigationTitle) {
      return;
    }

    updateProfileConfigurationTabLable(
      getActiveTab(profileConfigurationData)!.configKey ?? "",
      navigationTitle
    );
    closeDialogBox();
  };

  const openDialogueBoxToAddNewTab = () => {
    setIsAddDialogBoxOpen(true);
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
              } hover:text-sky-600 ${
              !profileConfigurationData.get(userInfoGroupKey)!.isActive &&
              "hover:bg-gray-50 hover:rounded-t-md"
            }`}
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
                    id: "add-new-group-label",
                    label: "Label",
                    type: "text",
                    placeholder: "Enter Navigation Title",
                    value: navigationTitle,
                    onChange: (e) => setNavigationTitle(e.target.value.trim()),
                  },
                  {
                    id: "add-new-group-description",
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
      <button
        onClick={openDialogueBoxToAddNewTab}
        id="add-new-tab"
        className="ml-4 px-4 py-2 text-gray-600 bg-gray-100 hover:text-white rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200 hover:drop-shadow-lg"
      >
        <CirclePlus size={18} color="#64748b" />
      </button>
      {isAddDialogBoxOpen && (
        <DialogBox
          title={"Add New Navigation Section"}
          inputFields={[
            {
              id: "navigationTitle",
              label: "Navigation Title",
              type: "text",
              placeholder: "Enter Navigation Title",
              value: navigationTitle,
              required: true,
              
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
            {
              id: "add-new-group-is-visible",
              label: "Visible on Site",
              type: "checkbox",
              checkboxValue: navigationTabVisible,
              onChange: () => {
                setNavigationTabVisible(!navigationTabVisible);
              },
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
    </div>
  );
};
export default ProfileConfigurationTab;
