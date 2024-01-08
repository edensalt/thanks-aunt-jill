// import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/cards/breadcrumbs';
import CreateCardForm from '@/app/ui/cards/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Card',
};
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cards', href: '/dashboard/cards' },
          {
            label: 'Create Card',
            href: '/dashboard/cards/create',
            active: true,
          },
        ]}
      />
      <CreateCardForm />
    </main>
  );
}