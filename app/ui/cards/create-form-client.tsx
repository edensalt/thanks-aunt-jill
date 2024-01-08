"use client"

import { GiftIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

 
interface FormData {
  gift: string;
  gifter: string;
}

export default function CreateCardFormClient({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({ gift: '', gifter: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
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
                value={formData.gift}
                placeholder="Enter gift name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
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
                value={formData.gifter}
                placeholder="Enter person who gave you the gift"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
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
        <button className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200" type="submit">{submitting ? <div className="flex gap-2"><ArrowPathIcon /><span>Generating Card</span></div> : <span>Generate Card</span>}</button>
      </div>
    </form>
  );
}
