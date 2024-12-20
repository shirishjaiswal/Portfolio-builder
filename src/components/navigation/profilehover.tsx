import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Image from "next/image";
import user from "../../../public/icons/user.svg";
import ProfileHoverContent from "./profilehover-content";

const ProfileHover: React.FC = function () {

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Image src={user} alt="user-profile" height={50} width={50} />
      </PopoverTrigger>
      <PopoverContent >
        <ProfileHoverContent />
      </PopoverContent>
    </Popover>
  );
};
export default ProfileHover;
