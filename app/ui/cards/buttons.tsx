import Link from "next/link";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";

export function CreateCard() {
  return (
    <Link
      href="/dashboard/cards/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Card</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ViewCard({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/cards/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">View</span>
      <EyeIcon className="w-5" />
    </Link>
  );
}
