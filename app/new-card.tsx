import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewCard() {

  const addCardHandler = async (formData: FormData) => {
    'use server'
    const gift = String(formData.get('gift'));
    const supabase = createServerActionClient<Database>({ cookies });
    const {data: { user }} = await supabase.auth.getUser();
    if (user) {
      await supabase.from('cards').insert({ gift, user_id: user.id })
    }
  }

  return (
    <form action={addCardHandler}>
      <input name="gift" />
    </form>
  )
}