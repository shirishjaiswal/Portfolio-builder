import InputTextField from "@/components/global-components/input-field/input-text-field";
import { Checkbox } from "@nextui-org/checkbox";
import { ParentSection, UserInfoParent_OP } from "./type";

type ProfileConfigurationParentEditSectionProps = {
  parent: UserInfoParent_OP;
  editParentSectionData: ParentSection
  setEditParentSectionData: (
    parent: ParentSection,
  ) => void;
};

const ProfileConfigurationParentEditSection: React.FC<
  ProfileConfigurationParentEditSectionProps
> = ({ parent,  editParentSectionData, setEditParentSectionData }) => {

  return (
    <div
      className={`flex items-end gap-4 ${
        parent.inEditMode ? "block" : "hidden"
      }`}
    >
      <InputTextField
        type="text"
        label="Section Name"
        placeholder="Enter Section Name"
        defaultValue={parent?.label}
        value={editParentSectionData?.label}
        onChange={(e) =>
          setEditParentSectionData({
            ...editParentSectionData!,
            label: e.target.value,
          })
        }
      />
      <InputTextField
        containerClassName="w-2/6"
        type="text"
        label="Section Description"
        placeholder="Enter Section Description"
        defaultValue={parent?.description}
        value={editParentSectionData?.description}
        onChange={(e) =>
          setEditParentSectionData({
            ...editParentSectionData!,
            description: e.target.value,
          })
        }
      />
      <Checkbox
        className="text-sm"
        isSelected={editParentSectionData?.multi}
        color="success"
        onChange={() =>
          setEditParentSectionData({
            ...editParentSectionData!,
            multi: parent?.multi ? false : true,
          })
        }
      >
        Allow Duplication
      </Checkbox>
      <Checkbox
        className="text-sm"
        isSelected={editParentSectionData?.required}
        color="success"
        onChange={() =>
          setEditParentSectionData({
            ...editParentSectionData!,
            required: parent?.required ? false : true,
          })
        }
      >
        Mandatory
      </Checkbox>
      <Checkbox
        className="text-sm"
        isSelected={editParentSectionData?.labelVisible}
        color="success"
        onChange={() =>
          setEditParentSectionData({
            ...editParentSectionData!,
            labelVisible: parent?.labelVisible ? false : true,
          })
        }
      >
        Show Section Label
      </Checkbox>
    </div>
  );
};

export default ProfileConfigurationParentEditSection;
