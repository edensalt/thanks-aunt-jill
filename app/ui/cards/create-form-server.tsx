import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { generateLetter } from "@/app/lib/chat";

export const dynamic = "force-dynamic";

interface FormData {
  gift: string;
  gifter: string;
}

export default async function addCard(formData: FormData, cookies: any) {
  const gift = formData.gift;
  const gifter = formData.gifter;

  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const letter = await generateLetter(gift);
      await supabase
        .from("cards")
        .insert({ user_id: user.id, gift, gifter, letter });
    }
  } catch (error) {
    throw new Error(`There has been an error: ${error}`);
  } finally {
    // TODO: Redirect to the specific card.
    redirect("/dashboard/cards");
  }
}