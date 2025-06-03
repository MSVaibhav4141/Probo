import Image from 'next/image';



export function MatchPredictionCard() {
  return (
    <div className="flex items-center gap-4 py-4 bg-gray-100 rounded-md">
      <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center">
        <Image
          src="/logo.png" // Change this path to your logo/image
          alt="Event Logo"
          width={56}
          height={56}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-sm sm:text-xl font-semibold text-black text-start">
          Aleksandar Kovacevic to win the match against Emil Ruusuvuori?
        </h2>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 text-start">
          PROBABILITY OF YES <span className="text-blue-600 font-medium">50.00%</span>
        </p>
      </div>
    </div>
  );
}
