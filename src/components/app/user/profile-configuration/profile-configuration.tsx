import ProfileConfigurationTab from "./profile-configuration-tab";
import ProfileConfigurationGroupSection from "./profile-congifuration-group-section";

const ProfileConfiguration = () => {
  return (
    <>
      <ProfileConfigurationTab />
      <div className={`bg-gradient-to-b from-gray-100 to-white p-1`}>
        <ProfileConfigurationGroupSection />
      </div>
    </>
  );
};

export default ProfileConfiguration;
