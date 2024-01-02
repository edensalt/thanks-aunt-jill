'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function CardStatus({ card }: { card: CardWithAuthor}) {
  const router = useRouter();
  const handleStatusUpdate = async () => {
    const supabase = createClientComponentClient<Database>()
    const {data: {user}} = await supabase.auth.getUser();

    if (user) {
      await supabase.from('cards').update({ complete: !card.complete }).eq('id', card.id)
      router.refresh();
    }
  }
  return <button onClick={handleStatusUpdate}>{card.complete ? "Sent" : "Incomplete"}</button>
}