import ProfileConfigurationTab from "@/components/app/user/profile-configuration/profile-configuration-tab";
import ProfileConfigurationGroupSection from "@/components/app/user/profile-configuration/profile-congifuration-group-section";

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
