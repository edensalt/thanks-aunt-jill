import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CardStatus({ complete }: { complete: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': complete === false,
          'bg-green-500 text-white': complete === true,
        },
      )}
    >
      {complete === false ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {complete === true ? (
        <>
          Sent
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
