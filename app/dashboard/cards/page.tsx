import { Suspense } from 'react';
import { Metadata } from 'next';

import Pagination from '@/app/ui/cards/pagination';
import Table from '@/app/ui/cards/table';
import { CreateCard } from '@/app/ui/cards/buttons';
import { CardsTableSkeleton } from '@/app/ui/skeletons';
import { SearchGift, SearchGifter } from '@/app/ui/search';
import { fetchCardPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Cards | Thanks Aunt Jill',
  description: 'View all of your thank you cards.'
};

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    giftQuery?: string;
    gifterQuery?: string;
    page?: string;
  };
}) {
  const giftQuery = searchParams?.giftQuery || '';
  const gifterQuery = searchParams?.gifterQuery || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCardPages(giftQuery, gifterQuery);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Cards</h1>
      </div>
      <div className="mt-4 flex md:flex-row flex-col md:items-center justify-between gap-2 md:mt-8">
        <SearchGift placeholder="Search by gift..." />
        <SearchGifter placeholder="Search by gifter..." />
        <CreateCard />
      </div>
      <Suspense key={giftQuery + gifterQuery + currentPage} fallback={<CardsTableSkeleton />}>
        <Table giftQuery={giftQuery} gifterQuery={gifterQuery} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
