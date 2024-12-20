import ProfileInfoClient from "./profile-page-client";
import { navigationSectionContentData } from "@/components/app/admin-control/page-navigation/static-data";

const ProfileInfoServer : React.FC = () => {
  return <ProfileInfoClient navigationSectionContentMap={navigationSectionContentData} />;
};
export default ProfileInfoServer;