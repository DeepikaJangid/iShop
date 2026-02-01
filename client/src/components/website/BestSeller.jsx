import Card from "@/components/website/Card"

export default async function BestSeller({ bestCategoryProducts, imageURL }) {
    return (
        <section className="border-b border-[#CCCCCC] pb-4" >
            <h3 className="font-bold text-[14px] md:text-md lg:text-lg uppercase text-black">
                best sellers in this category
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {bestCategoryProducts.map((prod, _) => {
                    return <Card {...prod} key={prod._id} imageURL={imageURL + "main_images/" + prod.thumbnail} />
                })}
            </div>
        </section>
    );
}
