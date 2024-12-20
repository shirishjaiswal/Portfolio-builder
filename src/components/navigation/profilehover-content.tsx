import { Frame, LogOut, PencilRuler, UserPen } from "lucide-react";
import Link from "next/link";

const ProfileHoverContent = (): JSX.Element => {
  return (
    <div className="w-full max-w-[260px] border-sm gap-4 p-1 rounded-sm  dark:border-default-100">
      <div aria-label="ul menu with icons">
        <Link
          href={"/user/info"}
          key="new"
          className="flex items-center gap-2 bg-slate-100 rounded p-1 m-1 w-full hover:bg-slate-200 transition-all ease-in-out"
        >
          <UserPen size={16} />
          Edit Profile
        </Link>
        <Link
          href={"/user/theme/global-selection"}
          key="copy"
          className="flex items-center gap-2 bg-slate-100 rounded p-1 m-1 w-full hover:bg-slate-200 transition-all ease-in-out"
        >
          <PencilRuler size={16} />
          Edit Theme
        </Link>
        <Link
          href={"/user/profile/avatar"}
          key={"avatar"}
          className="flex items-center gap-2 bg-slate-100 rounded p-1 m-1 w-full hover:bg-slate-200 transition-all ease-in-out"
        >
          <Frame size={16} />
          Edit Avatar
        </Link>
        <button
          key="delete"
          className="flex items-center gap-2 bg-slate-100 rounded p-1 m-1 w-full hover:bg-red-200 transition-all ease-in-out"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileHoverContent;
