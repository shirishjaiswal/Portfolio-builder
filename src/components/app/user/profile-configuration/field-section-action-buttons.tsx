import { useProfileConfigurationContextProvider } from "@/context/profile-configuration-context";
import { CircleCheckBig, Copy, Trash2 } from "lucide-react";
import { UserInfoField_OP } from "@/components/app/user/profile-configuration/type";

type FieldActionButtonsProps = {
  groupUniqueKey: string;
  parentUniqueKey: string;
  field: UserInfoField_OP;
  setCurrentField: (currentField: UserInfoField_OP) => void;
  deleteField: (fieldKey: string) => void;
};

const FieldActionButtons: React.FC<FieldActionButtonsProps> = ({
  groupUniqueKey,
  parentUniqueKey,
  field,
  setCurrentField,
  deleteField,
}: FieldActionButtonsProps) => {
  const { updateFieldSection, updateUnsavedChanges, duplicateFieldSection } =
    useProfileConfigurationContextProvider();

  const handleStoreChanges = () => {
    const tempField = {
      ...field,
      hasUnsavedChanges: false,
    };
    setCurrentField(tempField);
    updateUnsavedChanges(
      false,
      groupUniqueKey,
      parentUniqueKey,
      field.configKey
    ); 
    updateFieldSection(groupUniqueKey, parentUniqueKey, tempField);
  };

  const handleDeleteField = () => {
    deleteField(field.configKey);
  };

  const handleDuplicateField = () => {
    duplicateFieldSection(groupUniqueKey, parentUniqueKey, field.configKey);
  };
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
          {false && (
            <button
              className="transition-transform duration-300 hover:scale-150 hover:rounded-full"
              onClick={handleDuplicateField}
              id="copy-button"
              disabled={true}
            >
              <Copy size={18} color="#3730a3" />
            </button>
          )}
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
