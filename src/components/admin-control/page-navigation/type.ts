export type InputTypeSelection = "text" | "textarea" | "dropdown" | "duration" | "calendar" | "link" | "list" | "email" | "phone" |"image" | "droplinks";
//text , textarea , link , email , phone , dropdown , calendar , duration
export type SectionField = {
  key: string;
  selectionType: InputTypeSelection;
  isRequired: boolean;
  label: string;
  placeholder: string;
  textarea: string;
  dropdownSelection: "single" | "multi";
  dropdownOptions: string[];
  startDate: boolean;
  endDate: boolean;
  onGoing: boolean;
};

export type NavigationSection = {
  sectionName: string;
  isMulti: boolean;
  isCollapsed: boolean;
  isSectionNameVisible: boolean;
  isRequired: boolean;
  sectionFields: SectionField[];
};

export type NavigationSectionContent = {
  isActive: boolean;
  navigationName: string;
  navigationSection: NavigationSection[];
};

export type NavigationSectionContentMap = Map<string, NavigationSectionContent>;
