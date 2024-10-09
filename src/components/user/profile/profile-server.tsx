import ProfileClient from "./profile-client";
import { navigationSectionContentData } from "@/components/admin-control/page-navigation/static-data";

const ProfileServer : React.FC = () => {
  return <ProfileClient navigationSectionContentMap={navigationSectionContentData} />;
};
export default ProfileServer;