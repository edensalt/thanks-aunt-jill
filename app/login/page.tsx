import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GoogleButton from "./google-button";

export const dynamic = 'force-dynamic'

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      <div className="flex-1 flex justify-center items-center">
        <GoogleButton />
      </div>
    </div>
  );
}
