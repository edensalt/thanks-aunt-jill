import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchRecentlySentCards } from "@/app/lib/data";


export default async function RecentlySent() {

  const recentlySentCards = await fetchRecentlySentCards();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Recently Sent
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {recentlySentCards.map((recentlySentCard, i) => {
            return (
              <div
                key={recentlySentCard.id}
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
                      {recentlySentCard.gift}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {recentlySentCard.gifter}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {recentlySentCard.sent_at !== null ? formatDateToLocal(recentlySentCard.sent_at) : null}
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