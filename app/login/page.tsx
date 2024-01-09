import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GoogleButton from "./google-button";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex min-w-screen">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-12 md:divide-y-0 divide-y-2 md:divide-x-2 divide-x-0 w-full">
        <div className="h-40 w-40">
          <Image
            src={"/logos.jpeg"}
            alt="Thanks Aunt Jill Logo"
            height={160}
            width={160}
          />
        </div>
        <div className="sm:pl-12">
          <GoogleButton />
        </div>
      </div>
      <div className="fixed bottom-24 w-screen flex justify-center">
        <a
          target="_blank"
          href="https://github.com/edensalt"
          className="flex gap-4 items-center"
        >
          <Image
            src={"/github-mark-white.png"}
            alt="Github logo"
            height={20}
            width={20}
          />
          <p>@edensalt</p>
        </a>
      </div>
    </div>
  );
}
