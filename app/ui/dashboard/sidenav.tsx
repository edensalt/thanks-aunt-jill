import Link from "next/link";
import Image from "next/image";

import NavLinks from "./nav-links";
import AuthButtonServer from "@/app/auth-button-server";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#1060e4] p-4 md:h-40"
        href="/dashboard"
      >
        <div className="w-full h-16 flex items-end justify-center text-white relative">
          <Image
            src="/logo_transparent.png"
            alt="Thanks Aunt Jill logo"
            width={208}
            height={24}
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="h-auto w-full grow rounded-md bg-gray-50 block"></div>
        <Link
        href="https://github.com/edensalt"
          target="_blank"
          className="hidden md:flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <Image
            src="/github-mark.png"
            alt="Github logo"
            width={24}
            height={24}
          />
          <div className="hidden md:block font-medium">Built by @edensalt</div>
        </Link>
        <AuthButtonServer />
      </div>
    </div>
  );
}
