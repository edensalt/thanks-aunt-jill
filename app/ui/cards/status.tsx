"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function CardStatus({ card }: { card: CardWithAuthor }) {
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  const handleStatusUpdate = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (!card.complete) {
        await supabase
          .from("cards")
          .update({
            complete: true,
            sent_at: `${new Date().toISOString().toLocaleString()}`,
          })
          .eq("id", card.id);
      } else {
        console.log("click");
        await supabase
          .from("cards")
          .update({ complete: false, sent_at: null })
          .eq("id", card.id);
      }
      router.refresh();
    }
  };
  return (
    <button
      onClick={handleStatusUpdate}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      <span
        className={clsx(
          "inline-flex items-center rounded-full px-2 py-1 text-xs",
          {
            "bg-gray-100 hover:bg-[#f6afb9] text-gray-500 hover:text-white stroke-white hover:stroke-gray-500":
              !card.complete,
            "bg-[#f6afb9] hover:bg-gray-100 text-white hover:text-gray-500 stroke-gray-500 hover:stroke-white":
              card.complete,
          }
        )}
      >
        {card.complete ? (
          focus ? (
            <>
              Undo
              <ClockIcon className="ml-1 w-4" />
            </>
          ) : (
            <>
              Complete
              <CheckBadgeIcon className="ml-1 w-4" />
            </>
          )
        ) : focus ? (
          <>
            Sent
            <CheckBadgeIcon className="ml-1 w-4" />
          </>
        ) : (
          <>
            Pending
            <ClockIcon className="ml-1 w-4" />
          </>
        )}
      </span>
    </button>
  );
}
