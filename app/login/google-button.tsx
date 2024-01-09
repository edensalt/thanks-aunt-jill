"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const signInHandler = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <button onClick={signInHandler} className="hover:bg-gray-800 p-8 rounded-xl flex-col items-center">
      <Image
        src={"/Gmail_Icon.original.png"}
        alt="Github logo"
        width={80}
        height={80}
        className="mx-auto"
      />
      <div className="font-thin text-sm">Log in or Sign up</div>
    </button>
  );
}
