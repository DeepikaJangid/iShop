import BestSeller from "@/components/website/BestSeller";
import ProductListing from "@/components/website/ProductListing";
import { getProducts } from "@/api-calls/product";

export default async function CategorySlugPage({ params, searchParams }) {
    const { category_slug } = await params;
    const query = { category_slug: category_slug, status: true };
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
    const imageURL = productJSON.imageURL;
    const productData = productJSON.products;
    const bestCategoryProducts = productData.filter(prod => prod.is_best == true);
    const remainingCategoryProducts = productData.map(prod => prod);

    return (
        <section className="w-full bg-white rounded-[10px] my-4">
            <section className="max-w-[1300px] mx-auto md:pb-6 md:px-6 lg:px-9 grid grid-cols-1 md:grid-cols-4 gap-x-7">
                {/* Right Content */}
                <main className="md:col-span-3 lg:col-span-4 flex flex-col gap-6">
                    {
                        productData.length == 0 ? <p className="text-center text-[14px] md:text-lg lg:text-xl text-gray-500 capitalize">no product found in this category</p> : <>
                            {
                                bestCategoryProducts.length === 0 ? null :
                                    <BestSeller bestCategoryProducts={bestCategoryProducts} imageURL={imageURL} />
                            }
                            <ProductListing remainingCategoryProducts={remainingCategoryProducts} imageURL={imageURL} />
                        </>
                    }
                </main>
            </section>
        </section>
    );
}