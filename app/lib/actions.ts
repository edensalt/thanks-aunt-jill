'use server';

import { z } from 'zod';
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { generateLetter } from "@/app/lib/chat";
import { v4 as uuidv4 } from 'uuid';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  gift: z.string(),
  gifter: z.string(),
  letter: z.string(),
  id: z.string(),
});

const CreateCard = FormSchema.omit({ id: true, letter: true });

export type State = {
  errors?: {
    gift?: string[];
    gifter?: string[];
  };
  message?: string | null;
};

export async function createCard(prevState: State, formData: FormData) {
  let routeID = "";
  // Validate form using Zod
  const validatedFields = CreateCard.safeParse({
    gift: formData.get('gift'),
    gifter: formData.get('gifter'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { gift, gifter } = validatedFields.data;
  console.debug('got the form data: ', validatedFields.data)
 
  // Insert data into the database
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      console.log('user')
      const letter = await generateLetter(gift);
      console.log('success')
      const id = uuidv4();
      routeID = id;
      await supabase
        .from("cards")
        .insert({ user_id: user.id, id, gift, gifter, letter});

        console.log('success')
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  console.log('before')
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/cards');
  console.log('revalidated')
  redirect(`/dashboard/cards/${routeID}/view`);
}