'use server';

import { z } from 'zod';
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { generateLetter } from "@/app/lib/chat";
import { v4 as uuidv4 } from 'uuid';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Card } from '../global';

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
      message: 'Missing Fields. Failed to Create Card.',
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
      const letter = await generateLetter(gift, gifter);
      const id = uuidv4();
      routeID = id;
      await supabase
        .from("cards")
        .insert({ user_id: user.id, id, gift, gifter, letter});
        console.debug('SUCCESS: Create new card')
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/cards');
  redirect(`/dashboard/cards/${routeID}/view`);
}

export async function generateNewLetter(card: Card) {
  // Insert data into the database
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const letter = await generateLetter(card.gift, card.gifter);
      await supabase
        .from("cards")
        .update({ letter: letter })
        .eq('id', card.id)
        console.debug('SUCCESS: Update card letter')
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Update Card Letter.',
    };
  }
  // Revalidate the cache for the cards page and redirect the user.
  revalidatePath(`/dashboard/cards/`);
  redirect(`/dashboard/cards/${card.id}/view`);
}

export async function updateStatus(card: Card) {
  // Insert data into the database
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (!card.complete) {
        await supabase
          .from("cards")
          .update({
            complete: true,
            sent_at: `${new Date().toISOString().toLocaleString()}`,
          })
          .eq("id", card.id);
      } else {
        await supabase
          .from("cards")
          .update({ complete: false, sent_at: null })
          .eq("id", card.id);
      }
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Update Card Status.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/dashboard/cards/${card.id}/view`);
  redirect(`/dashboard/cards/${card.id}/view`);
}

export async function deleteCard(card: Card) {
  // Insert data into the database
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("cards")
        .delete()
        .eq('id', card.id)
        console.debug('SUCCESS: Card deleted')
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Delete Card.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/dashboard/cards`);
  redirect(`/dashboard/cards`);
}