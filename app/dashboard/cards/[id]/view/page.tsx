import Breadcrumbs from '@/app/ui/cards/breadcrumbs';
import { fetchCardById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ViewFormCard from '@/app/ui/cards/view-form';

export const metadata: Metadata = {
  title: 'View Card',
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
            label: `View Card for ${card.gift}`,
            href: `/dashboard/cards/${id}/view`,
            active: true,
          },
        ]}
      />
      <ViewFormCard card={card} />
    </main>
  );
}