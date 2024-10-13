import LoadFieldContent from "./load-field-content";
import { useUSerProfileContextProvider } from "@/context/user-profile-context";
import { UserProfileData, UserProfileSection } from "./types";
import Button from "@/components/Button/button";
import { CirclePlus, CircleX } from "lucide-react";

const NavigationSections = () => {
  const { userProfile, addNewSection, removeSection } =
    useUSerProfileContextProvider();

  const addSection = (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number
  ) => {
    addNewSection(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex
    );
  };

  const deleteSection = (
    userProfileKey: string,
    userProfileSectionsKey: string,
    userProfileSectionIndex: number
  ) => {
    removeSection(
      userProfileKey,
      userProfileSectionsKey,
      userProfileSectionIndex
    );
  };

  const loadSectionContent = (
    userProfileSection: UserProfileSection,
    isCloseVisible: boolean,
    userProfileSectionIndex: number,
    userProfileSectionsKey: string,
    userProfileKey: string
  ) => {
    return (
      <div className="relative">
        {isCloseVisible && (
          <div id="field-action" className="absolute top-1 right-1 flex z-10">
            <button>
              <CircleX
                color="#708090"
                size={20}
                strokeWidth={2}
                absoluteStrokeWidth
                onClick={() =>
                  deleteSection(
                    userProfileKey,
                    userProfileSectionsKey,
                    userProfileSectionIndex
                  )
                }
              />
            </button>
          </div>
        )}
        <div className="flex mt-2 gap-4 flex-wrap bg-slate-100 p-3 rounded-md drop-shadow-md">
          {userProfileSection.sectionFields.length > 0 &&
            userProfileSection.sectionFields.map(
              (sectionField, sectionFieldIdx) => {
                return (
                  <LoadFieldContent
                    key={
                      sectionField.key +
                      sectionFieldIdx +
                      userProfileSectionIndex
                    }
                    sectionField={sectionField}
                    sectionFieldIdx={sectionFieldIdx}
                    userProfileSectionIndex={userProfileSectionIndex}
                    userProfileSectionsKey={userProfileSectionsKey}
                    userProfileKey={userProfileKey}
                  />
                );
              }
            )}
        </div>
      </div>
    );
  };

  const loadUserProfileSectionSet = (
    userProfileSectionsKey: string,
    userProfileSections: UserProfileSection[],
    userProfileKey: string
  ) => {
    return userProfileSections.map(
      (userProfileSection, userProfileSectionIndex) => {
        return loadSectionContent(
          userProfileSection,
          userProfileSections.length > 1,
          userProfileSectionIndex,
          userProfileSectionsKey,
          userProfileKey
        );
      }
    );
  };
  const loadUserProfileData = (
    userProfileData: UserProfileData,
    userProfileKey: string
  ) => {
    return (
      <div>
        {userProfileData.userProfileSectionsData.size > 0 && (
          <div>
            {Array.from(userProfileData.userProfileSectionsData).map(
              ([userProfileSectionDataKey, userProfileSectionsData]) => (
                <>
                  {
                    <div
                      className="font-semibold text-lg pt-2"
                      key={`${userProfileSectionsData.sectionName}-${userProfileSectionDataKey}`}
                    >
                      {
                        <span>
                          {userProfileSectionsData.isSectionNameVisible &&
                            userProfileSectionsData.sectionName}
                        </span>
                      }
                    </div>
                  }
                  {loadUserProfileSectionSet(
                    userProfileSectionDataKey,
                    userProfileSectionsData.userProfileSections,
                    userProfileKey
                  )}
                  {userProfileSectionsData.isMulti && (
                    <Button
                      onClick={() => {
                        addSection(
                          userProfileKey,
                          userProfileSectionDataKey,
                          0
                        );
                      }}
                      isActive={true}
                      isDisabled={false}
                      type="button"
                    >
                      <div className="flex gap-2 bg-slate-100 p-2 my-2 rounded hover:bg-slate-300 transition-all ease-in-out border drop-shadow-md">
                        <CirclePlus size={20} />
                        <p className="text-medium font-semibold text-skyBlue-800 hover:text-skyBlue-600 ">
                          Add New
                        </p>
                      </div>
                    </Button>
                  )}
                </>
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {userProfile.size > 0 &&
        Array.from(userProfile.keys()).map((userProfileKey) => {
          const userProfileData = userProfile.get(userProfileKey);
          if (userProfileData === undefined) return null;
          return (
            <div key={`${userProfileKey}`}>
              {userProfileData.isActive &&
                loadUserProfileData(userProfileData, userProfileKey)}
            </div>
          );
        })}
    </>
  );
};

export default NavigationSections;
