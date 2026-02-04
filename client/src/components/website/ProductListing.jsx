'use client'
import Card from "@/components/website/Card";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductListing({ remainingCategoryProducts, imageURL }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sortBy, setSortBy] = useState(1);
    const [limit, setLimit] = useState(4);

    useEffect(() => {
        if (searchParams.get('sortby')) {
            setSortBy(Number(searchParams.get('sortby')));
        }
        if (searchParams.get('limit')) {
            setLimit(Number(searchParams.get('limit')));
        }
        //this code is for when the user refreshes the page after selecting sortby and limit filters the checkbox's should stay ticked.
    }, [])

    useEffect(
        () => {
            const query = new URLSearchParams(searchParams.toString()); // Copy current URL search params
            query.delete('sortby'); // Update sortby in URL
            if (sortBy != null) {
                query.append('sortby', sortBy)
            }
            query.delete('limit'); // Update limit in URL
            if (limit != null) {
                query.append('limit', limit)
            }
            router.replace(`${pathname}?${query.toString()}`, { scroll: false }); // Replace URL without page reload
        }, [sortBy, limit]
    )

    return (
        <section>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between text-[12px] md:text-[14px] mb-4">
                <span className="text-[#666666]">
                    <b className="text-black">1 - 40</b> of 120 results
                </span>

                <div className="hidden lg:flex items-center gap-4">
                    <span>Show Items</span>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className="outline-0 border-0 text-sm bg-[#EEEFF6] px-4 py-2 rounded font-bold appearance-none text-center hover:cursor-pointer"
                    >
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={0}>All</option>
                    </select>
                </div>

                <div className="hidden lg:flex items-center gap-2">
                    Sort By
                    {/* <span className="bg-[#EEEFF6] px-4 py-2 rounded">Default</span> */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border-0 outline-0 text-sm bg-[#EEEFF6] px-4 py-2 rounded appearance-none text-center hover:cursor-pointer"
                    >
                        <option value={1}>Latest</option>
                        <option value={2}>Oldest</option>
                        <option value={3}>Low to high</option>
                        <option value={4}>High to low</option>
                        <option value={5}>A to Z</option>
                        <option value={6}>Z to A</option>
                    </select>
                </div>
            </div>
            {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray-500">1 - 40 of 120 results</p>
                <div className="flex items-center gap-3">
                    <select
                        // value={limit}
                        // onChange={(e) => setLimit(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={0}>All</option>
                    </select>
                    <div className="border border-gray-500 rounded p-1 flex">
                        <div>Sort By</div>
                        <select
                            // value={sortBy}
                            // onChange={(e) => setSortBy(e.target.value)}
                            className="border-0 outline-0 rounded-lg px-3 text-sm"
                        >
                            <option value={1}>Latest</option>
                            <option value={2}>Oldest</option>
                            <option value={3}>Low to high</option>
                            <option value={4}>High to low</option>
                            <option value={5}>A to Z</option>
                            <option value={6}>Z to A</option>
                        </select>
                    </div>
                </div>
            </div> */}

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
