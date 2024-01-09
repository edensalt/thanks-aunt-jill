import Link from "next/link";
import Image from "next/image";

import NavLinks from "./nav-links";
import AuthButtonServer from "@/app/auth-button-server";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#1060e4] p-4 md:h-40"
        href="/"
      >
        <div className="w-full h-16 flex items-end text-white relative">
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
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <AuthButtonServer />
      </div>
    </div>
  );
}
