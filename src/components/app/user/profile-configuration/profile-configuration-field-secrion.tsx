import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { UserInfoField_OP } from "./type";
import Select from "react-select";

import InputTextField from "@/components/global-components/input-field/input-text-field";
import { ReactSelectOption } from "@/utils/types/react-select";
import { reactSelectStyles } from "@/utils/styles/react-select";
import { useEffect, useState } from "react";
import FieldInputParamaters from "./field-input-paramaters";
import { Checkbox } from "@nextui-org/checkbox";
import FieldActionButtons from "./field-section-action-buttons";

type ProfileConfigurationFieldSectionProps = {
  groupUniqueKey: string;
  parentUniqueKey: string;
  field: UserInfoField_OP;
};

const similarFieldParamaters: string[] = [
  "TEXT",
  "TEXTAREA",
  "LINK",
  "CALENDAR",
  "LIST",
  "EMAIL",
  "PHONE",
  "IMAGE",
];

const ProfileConfigurationFieldSection: React.FC<
  ProfileConfigurationFieldSectionProps
> = ({
  groupUniqueKey,
  parentUniqueKey,
  field,
}: ProfileConfigurationFieldSectionProps) => {
  const { fieldInputOptions, updateUnsavedChanges } =
    useProfileConfigurationContextProvider();

  const [currentField, setCurrentField] = useState<UserInfoField_OP>(field);

  useEffect(() => {
    setCurrentField(field);
  }, [field]);

  const handleUpdateCurrentFieldLabel = (value: string) => {
    setCurrentField({
      ...currentField,
      label: value,
      hasUnsavedChanges: true,
    });
    updateUnsavedChanges(
      groupUniqueKey,
      parentUniqueKey,
      field.uniqueKey,
      true
    );
  };

  const handleUpdateCurrentFieldDescription = (value: string) => {
    setCurrentField({
      ...currentField,
      description: value,
      hasUnsavedChanges: true,
    });
    updateUnsavedChanges(
      groupUniqueKey,
      parentUniqueKey,
      field.uniqueKey,
      true
    );
  };

  const handleUpdateCurrentFieldIsRequired = () => {
    setCurrentField({
      ...currentField,
      required: !currentField.required,
      hasUnsavedChanges: true,
    });
    updateUnsavedChanges(
      groupUniqueKey,
      parentUniqueKey,
      field.uniqueKey,
      true
    );
  };

  const handleUpdateCurrentFieldInput = (option: ReactSelectOption) => {
    setCurrentField({
      ...field,
      input: option.label,
      required: false,
      hasMultiSelection: false,
      options: [],
      startDate: false,
      endDate: false,
      onGoing: false,
      hasUnsavedChanges: true,
    });
    updateUnsavedChanges(
      groupUniqueKey,
      parentUniqueKey,
      field.uniqueKey,
      true
    );
  };

  return (
    <div
      className={`flex flex-col gap-2 group ${
        currentField.hasUnsavedChanges
          ? "bg-slate-300 border border-blue-800"
          : "bg-white"
      } relative bg-slate-50 p-4 rounded-md group mb-4 drop-shadow-md`}
    >
      <div
        className={`flex gap-2 justify-center items-center absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-sm border-slate00 border transition-opacity duration-300 delay-110 drop-shadow-xl`}
      >
        <FieldActionButtons
          groupUniqueKey={groupUniqueKey}
          parentUniqueKey={parentUniqueKey}
          field={currentField}
          setCurrentField={setCurrentField}
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex-col gap-3 w-2/6">
          <label
            className={`text-gray-700 text-sm font-medium transition-all w-full`}
          >
            {"Input Type"}
          </label>
          <Select
            className="w-full"
            key="selection-type"
            options={fieldInputOptions}
            value={fieldInputOptions.find(
              (option) => option.value === currentField.input
            )}
            onChange={(option) => {
              handleUpdateCurrentFieldInput(option as ReactSelectOption);
            }}
            menuPlacement="auto"
            menuPortalTarget={document.body}
            styles={reactSelectStyles}
            isDisabled={false}
          />
        </div>
        <InputTextField
          additionalContainerStyles="w-2/6"
          type="text"
          label="Label"
          placeholder="Enter Label"
          value={currentField.label}
          onChange={(e) => handleUpdateCurrentFieldLabel(e.target.value)}
        />
        <InputTextField
          additionalContainerStyles="w-2/6"
          type="text"
          label="Description"
          placeholder="Enter description"
          value={currentField.description}
          onChange={(e) => handleUpdateCurrentFieldDescription(e.target.value)}
        />
        <Checkbox
          className="text-sm w-2/6"
          isSelected={currentField.required}
          color="success"
          onChange={handleUpdateCurrentFieldIsRequired}
        >
          Is Field Mandatory
        </Checkbox>
      </div>
      {!similarFieldParamaters.includes(currentField.input) && (
        <div className="flex gap-3">
          <FieldInputParamaters
            groupUniqueKey={groupUniqueKey}
            parentUniqueKey={parentUniqueKey}
            currentField={currentField}
            setCurrentField={setCurrentField}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileConfigurationFieldSection;
