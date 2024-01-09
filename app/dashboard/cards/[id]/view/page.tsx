import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/app/ui/cards/breadcrumbs';
import { fetchCardById } from '@/app/lib/data';
import ViewFormCard from '@/app/ui/cards/view-form';

export const metadata: Metadata = {
  title: 'View Card | Thanks Aunt Jill',
  description: 'View your thank you card and generate new letter content powered by AI.'
};
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const card = await fetchCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cards', href: '/dashboard/cards' },
          {
            label: `${card.gift} from ${card.gifter}`,
            href: `/dashboard/cards/${id}/view`,
            active: true,
          },
        ]}
      />
      <ViewFormCard card={card} />
    </main>
  );
}