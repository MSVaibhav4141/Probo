"use client"; // Only for App Router

import Image from "next/image";
import { useRouter } from "next/navigation";

interface EventCardProps {
  eventId: string;
  traders: number;
  question: string;
  description: string;
  imageUrl: string;
  yesPrice: string;
  noPrice: string;
}

export default function EventCard({
  eventId,
  traders,
  question,
  description,
  imageUrl,
  yesPrice,
  noPrice,
}: EventCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${eventId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-sm p-4 w-full max-w-md hover:shadow-md transition mx-4 my-2"
    >
      <div className="text-xs text-gray-500 flex items-center mb-2">
        <span className="mr-1 text-sm">📊</span>
        {traders} traders
      </div>

      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 min-w-12 rounded">
          <Image
            src={imageUrl}
            alt="event"
            width={48}
            height={48}
            className="rounded object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-1 leading-snug">
            {question}
          </h3>
          <p className="text-xs text-gray-500">
            {description}{" "}
            <span className="text-blue-600 font-medium">Read more</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/event/${eventId}?choice=yes`);
          }}
        >
          Yes {yesPrice}
        </button>
        <button
          className="flex-1 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/event/${eventId}?choice=no`);
          }}
        >
          No {noPrice}
        </button>
      </div>
    </div>
  );
}
