import { Save } from "lucide-react";
import { useState } from "react";
import UserProfileParentSection from "@/components/app/user/profile/user-profile-parent-section";
import { useUserProfileContexts } from "@/context/user-profile-contexts";
import postUserProfileData from "@/utils/api-connections/user-details/post-user-profile-data";
import { toast } from "sonner";
import Loading from "@/components/loading/loading";

const UserProfileGroupSection: React.FC = () => {

  const [isSaving, setIsSaving] = useState(false);

  const { userProfileData, activeTab } = useUserProfileContexts();

  const handleSaveGroupChanges = async () => {
    setIsSaving(true);
    const userProfileDetilsGroup = Array.from(userProfileData.values());
    let response;
    try {
      response = await postUserProfileData(userProfileDetilsGroup);
      if (!response?.data) throw new Error(response?.error);
      toast.success("Saved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex justify-end w-full gap-2">
        <button
          className={`flex items-center justify-center space-x-1 -right-0 p-2 border transation-all rounded-full shadow-sm drop-shadow-xl transition duration-200 ease-in-out
    ${
      false
        ? "bg-gray-200 border-gray-200 cursor-not-allowed"
        : "bg-teal-500 border-slate00 hover:bg-teal-600"
    }
  h-12 min-w-40 mb-1`}
          onClick={handleSaveGroupChanges}
          id="save-changes-button"
          disabled={isSaving}
        >
          {!isSaving && (
            <>
              <Save color="#FFFFFF" size={20} />
              <p className="text-medium font-semibold text-white">
                Save Changes
              </p>
            </>
          )}
          {isSaving && (
            <div className="flex items-center gap-5 justify-center">
              <Loading
                spinColor="success"
                className="top-0.25"
                spinSize="sm"
                isBackdrop={false}
              />
              <p className="text-medium font-semibold text-white">Saving</p>
            </div>
          )}
        </button>
      </div>
      <>
        <div className="h-[726px] overflow-y-auto">
          {activeTab?.userInfoParents.map((parent, index) => {
            console.log(parent);
            return (
            <UserProfileParentSection key={parent.configKey} parent={parent} index={index}/>
          )})}
          {activeTab?.userInfoParents.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 text-gray-700 p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
              <p className="text-lg font-semibold">No Sections Available</p>
              <p className="text-md font-semibold text-gray-500">
                Start by adding a new section to organize your information.
              </p>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default UserProfileGroupSection;
