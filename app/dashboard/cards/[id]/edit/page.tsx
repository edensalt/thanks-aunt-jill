import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCardById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
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
            label: 'Edit Card',
            href: `/dashboard/cards/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div>edit card</div>
    </main>
  );
}