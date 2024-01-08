import { GiftIcon, UserIcon } from "@heroicons/react/24/outline";
import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CreateCardForm() {
  const addCard = async (formData: FormData) => {
    "use server";
    const gift = String(formData.get("gift"));
    const gifter = String(formData.get("gifter"));

    try {
      const supabase = createServerActionClient<Database>({ cookies });
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("cards").insert({ user_id: user.id, gift, gifter });
      }
    } catch (error) {
      throw new Error(`There has been an error: ${error}`);
    } finally {
      redirect("/dashboard/cards");
    }
  };

  return (
    <form action={addCard}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Add gift
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="gift"
                name="gift"
                type="string"
                placeholder="Enter gift name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <GiftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Add gifter
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="gifter"
                name="gifter"
                type="string"
                placeholder="Enter person who gave you the gift"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cards"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Generate Card</button>
      </div>
    </form>
  );
}
