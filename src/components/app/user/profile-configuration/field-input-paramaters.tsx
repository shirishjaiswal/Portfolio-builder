import { styleForTags } from "@/utils/styles/react-select";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";
import { Checkbox } from "@nextui-org/checkbox";
import CreatableSelect from "react-select/creatable";
import { getReactSelectOptions } from "@/utils/helper/user-info-group";
import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import React from "react";
import { MultiValue } from "react-select";

type FieldInputParamatersProps = {
  groupUniqueKey: string;
  parentUniqueKey: string;
  currentField: UserInfoField_OP;
  setCurrentField: (field: UserInfoField_OP) => void;
};

const FieldInputParamaters: React.FC<FieldInputParamatersProps> = ({
  groupUniqueKey,
  parentUniqueKey,
  currentField,
  setCurrentField,
}: FieldInputParamatersProps) => {
  const { updateUnsavedChanges } = useProfileConfigurationContextProvider();

  const handleUpdateMultiSelection = () => {
    setCurrentField({
      ...currentField,
      hasMultiSelection: !currentField.hasMultiSelection,
      hasUnsavedChanges: true,
    });
    updateUnsavedChanges(
      true,
      groupUniqueKey,
      parentUniqueKey,
      currentField.configKey
    );
  };

  const handleUpdateOptions = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ): void => {
    setCurrentField({
      ...currentField,
      options: selectedOptions.map((option) => option.value),
      hasUnsavedChanges: true,
    });

    updateUnsavedChanges(
      true,
      groupUniqueKey,
      parentUniqueKey,
      currentField.configKey
    );
  };
  return (
    <>
      {(currentField.input === "DROPDOWN" ||
        currentField.input === "CHECKBOX") && (
        <div className="flex w-full justify-items-start gap-3">
          <div className="flex-col gap-3 w-full">
            <label
              className={`text-gray-700 text-sm font-medium transition-all w-full`}
            >
              Add Options
            </label>
            <CreatableSelect
              isMulti
              placeholder="Options List"
              className="text-roboto text-sm"
              key="selection-type"
              styles={styleForTags}
              value={getReactSelectOptions(currentField!.options ?? []) ?? []}
              onChange={(e) => handleUpdateOptions(e)}
            />
          </div>
          <Checkbox
            className="text-sm w-3/6"
            isSelected={currentField?.hasMultiSelection}
            color="success"
            onChange={handleUpdateMultiSelection}
          >
            Multi Selection
          </Checkbox>
        </div>
      )}
    </>
  );
};

export default FieldInputParamaters;
