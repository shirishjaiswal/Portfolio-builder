import {
  Section,
  SiteSectionField,
  SubSection,
  UserProfile,
  UserProfileSection,
  UserProfileSectionData,
  UserSectionField,
  UserSiteProfile,
} from "./types";


export const getUserSiteProfile = (data: UserProfile) => {

  const userSiteProfileSet: UserSiteProfile[] = [] as UserSiteProfile[];

  const getSiteSectionField = (data: UserSectionField): SiteSectionField[] => {
    const selectionType = data.selectionType;

    const siteSectionFields: SiteSectionField[] = [] as SiteSectionField[];

    if (
      selectionType === "text" ||
      selectionType === "textarea" ||
      selectionType === "link" ||
      selectionType === "email" ||
      selectionType === "phone"
    ) {
      siteSectionFields.push({
        type: selectionType,
        isVisible: data.isVisible,
        label: data.label,
        value: data.inputValue[0],
      });
    }
    if (selectionType === "dropdown") {
      siteSectionFields.push( {
        type: selectionType,
        isVisible: data.isVisible,
        label: data.label,
        value: data.inputValue[0],
      });
    }
    if (selectionType === "duration") {
      siteSectionFields.push({
        type: selectionType,
        isVisible: data.isVisible,
        label: "Start Date",
        value: data.startDate
      });
      siteSectionFields.push({
        type: selectionType,
        isVisible: data.isVisible,
        label: "End Date",
        value: data.endDate
      });
      siteSectionFields.push({
        type: selectionType,
        isVisible: data.isVisible,
        label: "OnGoing",
        value: data.onGoing
      });
    }
    if(selectionType === "calendar") {
      siteSectionFields.push({
        type: selectionType,
        isVisible: data.isVisible,
        label: data.label,
        value: data.startDate
      });
    } 

    return siteSectionFields;
  };

  const getSubSection = (data: UserProfileSection): SubSection => {
    const siteSectionField: SubSection = [];
    data.sectionFields.forEach((value) => {
      siteSectionField.push(...getSiteSectionField(value));
    });

    return siteSectionField;
  };

  const getSubSections = (data: UserProfileSection[]): SubSection[] => {
    const subSections: SubSection[] = [];
    data.forEach((value) => {
      subSections.push(getSubSection(value));
    });
    return subSections;
  };

  const getSectionSet = (
    data: Map<string, UserProfileSectionData>
  ): Section[] => {
    const sectionSet: Section[] = [];
    data.forEach((value) => {
      const section: Section = {
        sectionName: value.sectionName,
        subSections: getSubSections(value.userProfileSections),
      };

      sectionSet.push(section);
    });

    return sectionSet;
  };

  data.forEach((value, key) => {
    const userSiteProfile: UserSiteProfile = {
      key: key,
      navigationName: value.navigationName,
      sectionSet: getSectionSet(value.userProfileSectionsData),
    };

    userSiteProfileSet.push(userSiteProfile);
  });

  return userSiteProfileSet;
};

