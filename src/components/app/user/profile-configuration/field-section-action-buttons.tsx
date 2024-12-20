import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { CircleCheckBig, Copy, Trash2 } from "lucide-react";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";

type FieldActionButtonsProps = {
  groupUniqueKey: string;
  parentUniqueKey: string;
  field: UserInfoField_OP;
  setCurrentField: (currentField: UserInfoField_OP) => void;
};

const FieldActionButtons: React.FC<FieldActionButtonsProps> = ({
  groupUniqueKey,
  parentUniqueKey,
  field,
  setCurrentField,
}: FieldActionButtonsProps) => {
  const { updateFieldSection, updateUnsavedChanges, deleteField, duplicateFieldSection } =
    useProfileConfigurationContextProvider();

  const handleStoreChanges = () => {
    const tempField = {
      ...field,
      hasUnsavedChanges: false,
    };
    setCurrentField(tempField);
    updateUnsavedChanges(
      groupUniqueKey,
      parentUniqueKey,
      field.uniqueKey,
      false
    );
    updateFieldSection(groupUniqueKey, parentUniqueKey, tempField);
  };

  const handleDeleteField = () => {
    deleteField(groupUniqueKey, parentUniqueKey, field.uniqueKey);
  };

  const handleDuplicateField = () => {
    duplicateFieldSection(groupUniqueKey, parentUniqueKey, field.uniqueKey);
  }
  return (
    <>
      {field.hasUnsavedChanges ? (
        <button
          className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
          onClick={handleStoreChanges}
          id="save-button"
        >
          <CircleCheckBig size={18} color="#15803d" />
        </button>
      ) : (
        <>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleDuplicateField}
            id="copy-button"
          >
            <Copy size={18} color="#3730a3" />
          </button>
          <button
            className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
            onClick={handleDeleteField}
            id="delete-button"
          >
            <Trash2 size={18} color="#be123c" />
          </button>
        </>
      )}
    </>
  );
};

export default FieldActionButtons;
