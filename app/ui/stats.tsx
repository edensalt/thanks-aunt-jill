import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  sent: BanknotesIcon,
  pending: ClockIcon,
  total: InboxIcon,
};

export default async function CardWrapper() {
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
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Sent" value={totalCompleteCards} type="sent" />
      <Card title="Pending" value={totalIncompleteCards} type="pending" />
      <Card title="Total Invoices" value={cards.length} type="total" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'total' | 'sent' | 'pending';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
      >
        {value}
      </p>
    </div>
  );
}
