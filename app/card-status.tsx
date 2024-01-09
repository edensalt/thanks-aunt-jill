"use client";

import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function CardStatus({ card }: { card: CardWithAuthor }) {
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
    <button onClick={handleStatusUpdate}>
      <span
        className={clsx(
          "inline-flex items-center rounded-full px-2 py-1 text-xs",
          {
            "bg-gray-100 text-gray-500": !card.complete,
            "bg-[#f6afb9] text-pink-700": card.complete,
          }
        )}
      >
        {card.complete ? (
          <>
            Complete
            <CheckBadgeIcon className="ml-1 w-4 stroke-pink-700" />
          </>
        ) : (
          <>
            Pending
            <ClockIcon className="ml-1 w-4 stroke-gray-500" />
          </>
        )}
      </span>
    </button>
  );
}
