import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOldestPendingCards() {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/login");
    }

    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .eq('complete', false)
      .order("created_at", { ascending: true })
      .limit(5);

    const pendingCards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];
    return pendingCards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }

}

export async function fetchRecentlySentCards() {
  noStore();

  const supabase = createServerComponentClient<Database>({ cookies });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      redirect("/login");
    }
    const { data } = await supabase
      .from("cards")
      .select("*, author: profiles(*)")
      .eq('complete', true)
      .order("created_at", { ascending: false })
      .limit(5);
    const sentCards =
      data?.map((card) => ({
        ...card,
        author: Array.isArray(card.author) ? card.author[0] : card.author,
      })) ?? [];

    return sentCards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recently sent cards.');
  }

}
