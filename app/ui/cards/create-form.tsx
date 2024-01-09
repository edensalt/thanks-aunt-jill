"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { ArrowPathIcon, GiftIcon, UserIcon } from "@heroicons/react/24/outline";

import { createCard } from "@/app/lib/actions";

export const dynamic = "force-dynamic";

export default function CreateCardForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createCard, initialState);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form action={dispatch} onSubmit={() => setSubmitting(true)}>
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
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.gift &&
                state.errors.gift.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
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
              <div id="customer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.gifter &&
                  state.errors.gifter.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
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
        {/* TODO: Have loader after submitting form */}
        {submitting ? (
          <button
            className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
            type="button"
            disabled
          >
            <ArrowPathIcon className="animate-spin stroke-green-600 h-6 w-6" />{" "}
            <p className="ml-2">Generating Card</p>
          </button>
        ) : (
          <button
            className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
            type="submit"
          >
            Generate Card
          </button>
        )}
      </div>
    </form>
  );
}