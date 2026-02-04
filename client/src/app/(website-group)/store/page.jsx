import Link from "next/link";
import ProductListing from "@/components/website/ProductListing";
import { getProducts } from "@/api-calls/product";
import Card from "@/components/website/Card";

export default async function Store({ params, searchParams }) {
    const query = { status: true };
    const urlSearchParams = await searchParams;
    if (urlSearchParams.brand_ids) { //it's brand slug not ids.. same with color_slug
        query.brand_ids = urlSearchParams.brand_ids;
    }
    if (urlSearchParams.color_ids) {
        query.color_ids = urlSearchParams.color_ids;
    }
    if (urlSearchParams.sortby) {
        query.sortby = urlSearchParams.sortby
    }
    if (urlSearchParams.limit) {
        query.limit = urlSearchParams.limit
    }
    const productJSON = await getProducts(query);
    const allProducts = productJSON.products;
    const imageURL = productJSON.imageURL;
    const featuredProducts = allProducts.filter(prod => prod.is_featured == true);
    return (
        <>
            {
                featuredProducts.length == 0 ? null
                    : <FeaturedSection featuredProducts={featuredProducts} imageURL={imageURL} />
            }
            <ProductListing remainingCategoryProducts={allProducts} imageURL={imageURL} />
        </>
    );
}

function FeaturedSection({ featuredProducts, imageURL }) {
    return (
        <section className="border-b border-[#CCCCCC] pb-4" >
            <h3 className="font-bold text-[14px] md:text-md lg:text-lg uppercase text-black">
                featured products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {featuredProducts?.map((prod, _) => {
                    return <Card {...prod} key={prod._id} imageURL={imageURL + "main_images/" + prod.thumbnail} />
                })}
            </div>
        </section>
    )
}
