import { Suspense } from "react";
import { Metadata } from "next";

import CardWrapper from "@/app/ui/dashboard/stats";
import OldestPending from "@/app/ui/dashboard/oldestPending";
import RecentlySent from "@/app/ui/dashboard/recentlySent";
import {
  LatestCardsSkeleton,
  StatsSkeleton,
} from "../../ui/skeletons";

export const metadata: Metadata = {
  title: "Dashboard | Thanks Aunt Jill",
  description: 'AI Generated Thank You Cards',
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestCardsSkeleton />}>
          <OldestPending />
        </Suspense>
        <Suspense fallback={<LatestCardsSkeleton />}>
         <RecentlySent />
        </Suspense>
      </div>
    </main>
  );
}
