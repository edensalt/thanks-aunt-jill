"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
      {card.complete ? "Sent" : "Pending"}
    </button>
  );
}
