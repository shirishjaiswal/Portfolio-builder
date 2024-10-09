import Button from "@/components/Button/button";
import SectionFieldFormation from "./section-field-formation";
import { SectionField } from "./type";
import { useNavigationSectionContentProvider } from "@/context/navigation-section-content";

type NavigationSectionProps = {
  navigationKey: string;
  sectionIdx: number;
  sectionFields: SectionField[];
};

const SECTIONFIELD: SectionField = {
  key: "",
  selectionType: "text",
  label: "",
  placeholder: "",
  textarea: "",
  dropdownSelection: "single",
  dropdownOptions: [],
  startDate: false,
  endDate: false,
  onGoing: false,
};

const NavigationSection: React.FC<NavigationSectionProps> = ({
  navigationKey,
  sectionIdx,
  sectionFields,
}: NavigationSectionProps) => {
  const { addSectionField } = useNavigationSectionContentProvider();
  const insertSectionField = () => {
    addSectionField(navigationKey, sectionIdx, {...SECTIONFIELD});
  };

  return (
    <>
      {sectionFields.map((sectionField, index) => (
        <div key={index + sectionField.key}>
          <SectionFieldFormation
            navigationKey={navigationKey}
            sectionIdx={sectionIdx}
            sectionFieldIdx={index}
            sectionFields={sectionField}
          />
        </div>
      ))}
      <Button
        label={"Add Field"}
        style="primary"
        onClick={insertSectionField}
        isActive={true}
        isDisabled={false}
        type="button"
      />
    </>
  );
};

export default NavigationSection;
