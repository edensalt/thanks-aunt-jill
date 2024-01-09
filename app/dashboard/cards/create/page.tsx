import { Metadata } from 'next';

import Breadcrumbs from '@/app/ui/cards/breadcrumbs';
import CreateCardForm from '@/app/ui/cards/create-form';

export const metadata: Metadata = {
  title: 'Create Card',
  description: 'Create a new thank you card and generate a letter powered by AI.'
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