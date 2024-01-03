import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
// import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { SearchGift, SearchGifter } from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Cards',
};

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

  // const totalPages = await fetchInvoicesPages(query);
  const totalPages = 6

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Cards</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchGift placeholder="Search gift..." />
        <SearchGifter placeholder="Search gifter..." />
        <CreateInvoice />
      </div>
      <Suspense key={giftQuery + gifterQuery + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table giftQuery={giftQuery} gifterQuery={gifterQuery} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
