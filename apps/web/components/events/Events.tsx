import { CirciledPlusIcon } from '@repo/ui/Icons/Icons'

const Events = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between w-full py-4 px-2">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-lg object-cover"
          src="https://probo.in/_next/image?url=https%3A%2F%2Fprobo.gumlet.io%2Fimage%2Fupload%2Fprobo_product_images%2FIMAGE_4965b9cb-5c60-4b78-bf3d-498920885c52.png&w=256&q=75"
          alt="event icon"
        />
        <h1 className="text-xl font-semibold text-gray-900">
          {title}
        </h1>
      </div>
      <button className="text-gray-500 hover:text-black transition">
        <CirciledPlusIcon w="24" h="24" stroke="1.5" className="w-6 h-6" />
      </button>
    </div>
  )
}

export default Events
