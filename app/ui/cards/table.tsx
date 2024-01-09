import { ViewCard } from '@/app/ui/cards/buttons';
import InvoiceStatus from '@/app/ui/cards/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredCards } from '@/app/lib/data';
import CardStatus from '@/app/card-status';

export default async function InvoicesTable({
  giftQuery,
  gifterQuery,
  currentPage,
}: {
  giftQuery: string;
  gifterQuery: string;
  currentPage: number;
}) {
  const cards = await fetchFilteredCards(giftQuery, gifterQuery, currentPage, "created_at", false);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {cards?.map((card) => (
              <div
                key={card.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                  <p>{card.gift}</p>
                    <p className="text-sm text-gray-500">{card.gifter}</p>
                  </div>
                  <CardStatus card={card} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                    {formatDateToLocal(card.created_at)}
                    </p>
                    <p>{card.sent_at === null ? "" : formatDateToLocal(card.sent_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ViewCard id={card.id} />
                    {/* <DeleteInvoice id={card.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Gift
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Gifter
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sent
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {cards?.map((card) => (
                <tr
                  key={card.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                   
                      <p>{card.gift}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {card.gifter}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {formatDateToLocal(card.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {card.sent_at === null ? "" : formatDateToLocal(card.sent_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CardStatus card={card} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewCard id={card.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
