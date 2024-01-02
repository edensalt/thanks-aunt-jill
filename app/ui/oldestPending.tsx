import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { formatDateToLocal } from "@/lib/utils";

export default async function OldestPending() {
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
    .eq('complete', false)
    .order("created_at", { ascending: true })
    .limit(5);

  const pendingCards =
    data?.map((card) => ({
      ...card,
      author: Array.isArray(card.author) ? card.author[0] : card.author,
    })) ?? [];


  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Oldest Pending
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {pendingCards.map((pendingCard, i) => {
            return (
              <div
                key={pendingCard.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div
                    
                    className="mr-4 rounded-full w-8 h-8 bg-gray-400"
              
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {pendingCard.gift}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {pendingCard.gifter}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {formatDateToLocal(pendingCard.created_at)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
