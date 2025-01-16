import { useState } from "react";
import InputTextField from "@/components/global-components/input-field/input-text-field";
import { PencilLine } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/loading/loading";
import UserDetails from "@/utils/validation/user-details-validation";
import DialogBox from "@/components/global-components/dialogue-box/dialogue-box";
import resetPassword from "@/utils/api-connections/user-account/reset-password";
import deleteUser from "@/utils/api-connections/user-account/delete-user";
import { useRouter } from "next/navigation";

const AccountSettings = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [warning, setWarning] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof passwordFields
  ) => {
    setPasswordFields({ ...passwordFields, [field]: e.target.value });
  };

  const validateFields = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordFields;
    const warnings = {
      currentPassword: currentPassword ? "" : "Field is required",
      newPassword: newPassword ? "" : "Field is required",
      confirmPassword: confirmPassword ? "" : "Field is required",
    };

    // Ensure the warnings object has the correct shape
    if (Object.values(warnings).some((warning) => warning)) {
      setWarning({
        currentPassword: warnings.currentPassword || "",
        newPassword: warnings.newPassword || "",
        confirmPassword: warnings.confirmPassword || "",
      });
      return false;
    }

    // Password complexity check
    if (!UserDetails.validatePassword(newPassword)) {
      setWarning({
        currentPassword: "",
        newPassword: "Password must meet complexity requirements.",
        confirmPassword: "",
      });
      return false;
    }

    // Password match check
    if (newPassword !== confirmPassword) {
      setWarning({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "Passwords do not match.",
      });
      return false;
    }

    return true;
  };

  const handleSavePassword = async () => {
    setIsSaving(true);

    // Validate fields before proceeding
    if (!validateFields()) {
      setIsSaving(false);
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = passwordFields;

    try {
      await resetPassword(currentPassword, newPassword, confirmPassword);
      toast.success("Password updated successfully.");

      // Reset fields and warnings
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setWarning({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password to confirm.");
      return;
    }

    try {
      await deleteUser(deletePassword);
      toast.success("Account deleted successfully.");
      setIsDeleteDialogOpen(false);
      router.replace("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="p-4 border rounded-md shadow-sm">
        <h2 className="font-medium text-lg text-gray-700 mb-4">
          Change Password
        </h2>
        <div className="space-y-4">
          <InputTextField
            type="password"
            id="current-password"
            label="Current Password"
            value={passwordFields.currentPassword}
            onChange={(e) => handlePasswordChange(e, "currentPassword")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            errorMessage={warning.currentPassword}
          />
          <InputTextField
            description="Password should be at least 8 characters long and includes lowercase, uppercase, numeric, and special characters"
            type="password"
            id="new-password"
            label="New Password"
            value={passwordFields.newPassword}
            onChange={(e) => handlePasswordChange(e, "newPassword")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            errorMessage={warning.newPassword}
          />
          <InputTextField
            type="password"
            id="confirm-password"
            label="Confirm Password"
            value={passwordFields.confirmPassword}
            onChange={(e) => handlePasswordChange(e, "confirmPassword")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            errorMessage={warning.confirmPassword}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSavePassword}
            disabled={isSaving}
            className={`flex items-center justify-center space-x-1 px-4 py-2 border rounded-md shadow-sm transition duration-200 ease-in-out ${
              isSaving
                ? "bg-gray-200 border-gray-200 cursor-not-allowed"
                : "bg-teal-500 border-slate-300 hover:bg-teal-600"
            }`}
          >
            {isSaving ? (
              <div className="flex items-center space-x-4">
                <Loading spinColor="success" spinSize="sm" isBackdrop={false} />
                <p className="text-medium font-semibold text-white">Updating</p>
              </div>
            ) : (
              <>
                <PencilLine color="#FFFFFF" size={20} />
                <p className="text-medium font-semibold text-white">
                  Change Password
                </p>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="p-4 border rounded-md shadow-sm">
        <h2 className="font-medium text-lg text-gray-700 mb-4">
          Delete Account
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Deleting your account is permanent and cannot be undone. All your data
          will be removed.
        </p>
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-100"
        >
          Delete Account
        </button>
      </div>

      <DialogBox
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirm Account Deletion"
        subtitle="Please enter your password to confirm the deletion of your account."
        inputFields={[
          {
            type: "password",
            label: "Password",
            value: deletePassword,
            onChange: (e) => setDeletePassword(e.target.value),
            required: true,
            errorMessage: deletePassword ? "" : "Password is required",
          },
        ]}
        buttons={[
          {
            label: "Cancel",
            type: "gray",
            onClick: () => setIsDeleteDialogOpen(false),
          },
          {
            label: "Delete",
            type: "red",
            onClick: handleDeleteAccount,
          },
        ]}
      />
    </div>
  );
};

export default AccountSettings;
