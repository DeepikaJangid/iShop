import Card from "@/components/website/Card"

export default function ProductListing({ remainingCategoryProducts, imageURL }) {
    return (
        <section>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between text-[12px] md:text-[14px] mb-4">
                <span className="text-[#666666]">
                    <b className="text-black">1 - 40</b> of 120 results
                </span>

                <div className="hidden lg:flex items-center gap-4">
                    <span>Show Items</span>
                    <span className="bg-[#EEEFF6] px-4 py-2 rounded font-bold">24</span>
                </div>

                <div className="hidden lg:flex items-center gap-2">
                    Sort By
                    <span className="bg-[#EEEFF6] px-4 py-2 rounded">Default</span>
                </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {remainingCategoryProducts?.map((prod, _) => {
                    return <Card {...prod} key={prod._id} imageURL={imageURL + "main_images/" + prod.thumbnail} />
                })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
                <button disabled className="px-3 py-1 bg-gray-200 rounded">
                    Prev
                </button>
                <button className="px-3 py-1 bg-green-600 text-white rounded">1</button>
                <button className="px-3 py-1 bg-gray-200 rounded">2</button>
                <button className="px-3 py-1 bg-gray-200 rounded">3</button>
                <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
            </div>
        </section>
    );
}
