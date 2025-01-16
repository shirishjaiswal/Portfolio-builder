"use client"
import Logo from "@/icons/logo";
import ProfileHover from "./profilehover";
import { useRouter } from "next/navigation";

function Navigation() {
  const router = useRouter();
  return (
    <div className="flex bg-white w-full min-h-8p justify-between items-center px-2 pr-4 drop-shadow-xl sticky top-0 z-40">
      <button onClick={() => {router.push("/")}}>
        <Logo fill="#2D67BF" width={200} />
      </button>
      <div>
          <ProfileHover />
      </div>
    </div>
  );
}

export default Navigation;
