"use client";

import Link from "next/link";
import { GiftIcon, UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

import { useFormState } from "react-dom";
import { createCard } from "@/app/lib/actions";
import { Card } from "@/app/global";

export const dynamic = "force-dynamic";

export default function ViewFormCard({ card }: { card: Card }) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createCard, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                {card.gift}
              </div>
              <GiftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                {card.gifter}
              </div>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                {card.letter ? card.letter : "No letter generated"}
              </div>
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cards"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
        <Link
          href="/dashboard/cards"
          className="flex h-10 items-center rounded-lg bg-red-100 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-200"
        >
          Delete
        </Link>
        <button
          className="flex h-10 items-center rounded-lg bg-yellow-100 px-4 text-sm font-medium text-yellow-600 transition-colors hover:bg-yellow-200"
          type="submit"
        >
          Regenerate Letter
        </button>
        {/* TODO: Have loader after submitting form */}
        <button
          className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
          type="submit"
        >
          Mark As Complete
        </button>
      </div>
    </form>
  );
}
