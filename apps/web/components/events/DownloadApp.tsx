import Image from "next/image";

export default function DownloadAppCard() {
  return (
    <div className="bg-gray-100 rounded-xl p-5 flex items-center justify-between max-w-md w-full shadow-sm">
      {/* Text Content */}
      <div>
        <h3 className="font-semibold text-lg leading-tight text-gray-800">
          DOWNLOAD APP <br />
          FOR BETTER & <br />
          FAST EXPERIENCE
        </h3>

        <button className="mt-4 bg-black text-white text-sm px-4 py-2 rounded font-medium shadow hover:bg-gray-800 transition">
          Download Now
        </button>
      </div>

      {/* Image */}
      <div className="w-28 h-28 relative ml-4">
        <Image
          src="/download.jpg" 
          alt="App Experience"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
