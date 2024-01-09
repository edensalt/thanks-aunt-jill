import CardWrapper from "@/app/ui/dashboard/stats";
import { Suspense } from "react";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "../../ui/skeletons";
import { Metadata } from "next";
import OldestPending from "@/app/ui/dashboard/oldestPending";
import RecentlySent from "@/app/ui/dashboard/recentlySent";

export const metadata: Metadata = {
  title: "Dashboard | Thanks Aunt Jill",
  description: 'AI Generated Thank You Cards',

};

export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <OldestPending />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
         <RecentlySent />
        </Suspense>
      </div>
    </main>
  );
}
