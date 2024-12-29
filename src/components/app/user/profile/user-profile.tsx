import UserProfileGroupSection from "./user-profile-group-section";
import UserProfileTab from "./user-profile-tab";

const UserProfile = () => {
  return (
    <>
      <UserProfileTab />
      <div className={`bg-gradient-to-b from-gray-100 to-white p-1`}>
        <UserProfileGroupSection />
      </div>
    </>
  );
};

export default UserProfile;
