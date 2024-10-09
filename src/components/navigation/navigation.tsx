import Image from "next/image";
import user from "../../../public/icons/user.svg";
import Logo from "@/icons/logo";

function Navigation() {
  return (
    <div className="flex bg-white w-full h-16 justify-between items-center px-2 pr-4 drop-shadow-xl sticky top-0 z-50">
      <div>
        <Logo fill="#2D67BF" width={200} />
      </div>
      <div>
        <Image src={user} alt="user-profile" height={50} width={50} />
      </div>
    </div>
  );
}

export default Navigation;
