import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewCard from "./new-card";
import CardStatus from "./card-status";
import Cards from "./cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("cards")
    .select("*, author: profiles(*)")
    .order("gift", { ascending: true });

  const cards =
    data?.map((card) => ({
      ...card,
      author: Array.isArray(card.author) ? card.author[0] : card.author,
    })) ?? [];

  const totalCompleteCards = cards.filter((card) => card.complete).length;
  const totalIncompleteCards = cards.length - totalCompleteCards;

  return (
    <>
      
      <div className="flex">
        <h1>
          {totalIncompleteCards} incomplete card
          {totalIncompleteCards !== 1 ? "s" : ""}
        </h1>
        <h1>
          {totalCompleteCards} sent card{totalCompleteCards !== 1 ? "s" : ""}
        </h1>
      </div>
      <NewCard />
      <Cards cards={cards} />
    </>
  );
}
