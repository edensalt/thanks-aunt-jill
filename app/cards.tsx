'use client'

import { useEffect } from "react";
import CardStatus from "./card-status";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Cards({ cards }: { cards: CardWithAuthor[] }) {

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel('realtime cards').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'cards',
    }, (payload) => {
      router.refresh();
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [router, supabase])

  return cards.map((card) => (
    <div key={card.id}>
      <p>{card.author.name}</p>
      <p>{card.gift}</p>
      <CardStatus card={card} />
    </div>
  ));
}