import InputTextField from "@/components/global-components/input-field/input-text-field";
import Loading from "@/components/loading/loading";
import {
  UserDetailsType,
  useUserSettingsContext,
} from "@/context/user-settings-context";
import putUserDetails from "@/utils/api-connections/user-details/put";
import UserDetails from "@/utils/validation/user-details-validation";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserDetailsFieldsType = {
  id: string;
  label: string;
  key: string;
  input: string;
  requireVerify: boolean;
  isVerified: boolean;
  readOnly: boolean;
  value: string;
  errorMessage: string;
};
const generateUserDetailsFields = (
  userDetails: UserDetailsType
): UserDetailsFieldsType[] => {
  const userDetailsFields: UserDetailsFieldsType[] = [];

  const userDetailsLable: Record<
    keyof Pick<
      UserDetailsType,
      "email" | "firstName" | "lastName" | "phoneNumber"
    >,
    string
  > = {
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Mobile",
  };

  Object.entries(userDetails).forEach(([key, value]) => {
    if (key in userDetailsLable) {
      const typedKey = key as keyof typeof userDetailsLable;

      const fieldValue = value as string;

      if (typedKey === "email") {
        userDetailsFields.push({
          id: "email",
          label: userDetailsLable[typedKey],
          key: "email",
          input: "email",
          requireVerify: true,
          isVerified: userDetails.emailVerified,
          readOnly: true,
          value: fieldValue as string,
          errorMessage: "",
        });
      } else if (typedKey === "phoneNumber") {
        userDetailsFields.push({
          id: "phoneNumber",
          label: userDetailsLable[typedKey],
          key: "phoneNumber",
          input: "text",
          requireVerify: true,
          isVerified: userDetails.phoneNumberVerified,
          readOnly: userDetails.phoneNumberVerified ? true : false,
          value: fieldValue as string,
          errorMessage: "",
        });
      } else {
        userDetailsFields.push({
          id: key,
          label: userDetailsLable[typedKey],
          key: key,
          input: "text",
          requireVerify: false,
          isVerified: false,
          readOnly: false,
          value: fieldValue as string,
          errorMessage: "",
        });
      }
    }
  });
  return userDetailsFields;
};

const ProfileSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [fieldsEdited, setFieldsEdited] = useState(false);
  const { userDetails } = useUserSettingsContext();

  const [userDetailsState, setUserDetailsState] = useState<
    UserDetailsFieldsType[] | null
  >();

  useEffect(() => {
    setUserDetailsState(generateUserDetailsFields(userDetails));
  }, [userDetails]);

  useEffect(() => {
    userDetailsState?.forEach((field) => {
      console.log(field.value, userDetails[field.key as keyof UserDetailsType]);
      if (field.value !== userDetails[field.key as keyof UserDetailsType]) {
        setFieldsEdited(true);
      }
    });
  }, [userDetailsState]);

  if (!userDetailsState) return <></>;

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetailsState((prev) => {
      return prev?.map((field) => {
        if (field.key === "firstName") {
          return { ...field, value: e.target.value };
        }
        return field;
      });
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetailsState((prev) => {
      return prev?.map((field) => {
        if (field.key === "lastName") {
          return { ...field, value: e.target.value };
        }
        return field;
      });
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetailsState((prev) => {
      return prev?.map((field) => {
        if (field.key === "phoneNumber") {
          return { ...field, value: e.target.value };
        }
        return field;
      });
    });
  };

  const getChangeFunction = (fieldKey: string) => {
    if (fieldKey === "firstName") return handleFirstNameChange;
    if (fieldKey === "lastName") return handleLastNameChange;
    if (fieldKey === "phoneNumber") return handlePhoneNumberChange;
  };

  const handleSave = async () => {
    setIsSaving(true);
  
    try {
      const firstName =
        userDetailsState?.find((field) => field.key === "firstName")?.value ||
        userDetails.firstName;
      const lastName =
        userDetailsState?.find((field) => field.key === "lastName")?.value ||
        userDetails.lastName;
      const phoneNumber =
        userDetailsState?.find((field) => field.key === "phoneNumber")?.value ||
        userDetails.phoneNumber;
  
      const isFirstNameValid = UserDetails.validateName(firstName);
      const isLastNameValid = UserDetails.validateName(lastName);
      const isPhoneNumberValid = UserDetails.validatePhoneNumber(
        phoneNumber
      );
  
      if (!isFirstNameValid) {
        toast.error("Invalid first name.");
        return;
      }
      if (!isLastNameValid) {
        toast.error("Invalid last name.");
        return;
      }
      if (phoneNumber && !isPhoneNumberValid) {
        toast.error("Invalid phone number.");
        return;
      }
  
      await putUserDetails(firstName, lastName, phoneNumber);

      toast.success("User details saved successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white p-1">
      {" "}
      <div className="flex justify-end w-full gap-2">
        <button
          className={`flex items-center justify-center space-x-1 -right-0 p-2 border transation-all rounded-full shadow-sm drop-shadow-xl transition duration-200 ease-in-out
${
  fieldsEdited === false
    ? "bg-gray-200 border-gray-200 cursor-not-allowed"
    : "bg-teal-500 border-slate00 hover:bg-teal-600"
}
h-12 min-w-40 mb-1`}
          onClick={handleSave}
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
      <div>
        {userDetailsState.map((fields) => (
          <div
            key={fields.key}
            className="flex gap-5 items-center border p-4 rounded-md shadow-sm"
          >
            <p className="font-medium text-gray-700 w-1/4">{fields.label}</p>
            <div className="flex-1">
              <InputTextField
                type={fields.input}
                id={fields.id}
                value={fields.value}
                verified={fields.isVerified}
                requireVerify={fields.requireVerify}
                readOnly={fields.readOnly}
                errorMessage={fields.errorMessage}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fields.readOnly
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white"
                }`}
                onChange={getChangeFunction(fields.key)}
              />
              {fields.requireVerify && (
                <p
                  className={`text-xs text-red-500 mt-1 ${
                    fields.isVerified ? "hidden" : ""
                  }`}
                >
                  {fields.isVerified ? "Verified" : "Verification required"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
