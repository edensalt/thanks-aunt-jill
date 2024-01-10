"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GiftIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  CheckBadgeIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { deleteCard, generateNewLetter, updateStatus } from "@/app/lib/actions";
import { Card } from "@/app/global";
import { formatDateToLocal } from "@/app/lib/utils";

export const dynamic = "force-dynamic";

export default function ViewFormCard({ card }: { card: Card }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);

  return (
    <div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-2">
          <div className="relative mt-2 rounded-md">
            <div
              className={`relative ${
                card.complete
                  ? "text-green-500 stroke-green-500 bg-green-100 border-green-500"
                  : "text-gray-500 stroke-gray-500 bg-gray-100 border-gray-500"
              }`}
            >
              <div
                className={`peer block w-full rounded-md border py-2 pl-10 pr-2 text-sm outline-2 ${
                  card.complete ? "border-green-500" : "border-gray-500"
                }`}
              >
                {card.complete ? <p>Card sent</p> : <p>Card not sent</p>}
              </div>
              {card.complete ? (
                <CheckCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
              ) : (
                <XCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-4 gap-2 align-center">
            <div className="relative mt-2 rounded-md w-full">
              <div className="relative">
                <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                  {formatDateToLocal(card.created_at)}
                </div>
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="relative mt-2 rounded-md w-full">
              {card.complete ? (
                <div className="relative">
                  <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                    {formatDateToLocal(card.created_at)}
                  </div>
                  <CheckBadgeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              ) : (
                <div className="relative">
                  <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                    Pending
                  </div>
                  <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              )}
            </div>
          </div>
        </div>
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
              <div className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-2 text-sm outline-2 placeholder:text-gray-500">
                {card.letter ? card.letter : "No letter generated"}
              </div>
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex md:flex-row justify-end items-start gap-4 flex-col-reverse">
        <Link
          href="/dashboard/cards"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
        {!deleteConfirmation && (
          <button
            className="flex h-10 items-center rounded-lg bg-red-100 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-200"
            type="button"
            onClick={() => setDeleteConfirmation(true)}
          >
            Delete
          </button>
        )}
        {deleteConfirmation && (
          <button
            className="flex h-10 items-center rounded-lg bg-red-100 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-200"
            type="button"
            autoFocus={true}
            onClick={() => deleteCard(card)}
          >
            Confirm Delete
          </button>
        )}
        {submitting ? (
          <button
            className="flex h-10 items-center rounded-lg bg-yellow-100 px-4 text-sm font-medium text-yellow-600 transition-colors hover:bg-yellow-200"
            type="button"
            disabled
          >
            <ArrowPathIcon className="animate-spin stroke-yellow-600 h-6 w-6" />{" "}
            <p className="ml-2">Generating letter</p>
          </button>
        ) : (
          <button
            className="flex h-10 items-center rounded-lg bg-yellow-100 px-4 text-sm font-medium text-yellow-600 transition-colors hover:bg-yellow-200"
            onClick={() => {
              setSubmitting(true);
              generateNewLetter(card).then(() => setSubmitting(false));
            }}
            type="button"
          >
            {card.letter ? "Regenerate letter" : "Generate letter"}
          </button>
        )}

        {card.complete &&
          (updating ? (
            <button
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              type="button"
              disabled
            >
              <ArrowPathIcon className="animate-spin stroke-gray-600 h-6 w-6" />{" "}
              <p className="ml-2">Updating</p>
            </button>
          ) : (
            <button
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              type="button"
              onClick={() => {
                setUpdating(true);
                updateStatus(card).then(() => setUpdating(false));
              }}
            >
              Mark as not sent
            </button>
          ))}
        {!card.complete &&
          (updating ? (
            <button
              className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
              type="button"
              disabled
            >
              <ArrowPathIcon className="animate-spin stroke-green-600 h-6 w-6" />{" "}
              <p className="ml-2">Updating</p>
            </button>
          ) : (
            <button
              className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
              type="button"
              onClick={() => {
                setUpdating(true);
                updateStatus(card).then(() => setUpdating(false));
              }}
            >
              Mark as sent
            </button>
          ))}
      </div>
    </div>
  );
}
