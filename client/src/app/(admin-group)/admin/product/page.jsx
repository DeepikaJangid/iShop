import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { FiChevronLeft, FiEdit } from "react-icons/fi";
import Link from "next/link";
import { getProducts } from "@/api-calls/product";
import DeleteData from "@/components/admin/DeleteBtn";
import StatusToggle from "@/components/admin/StatusToggle";
import Description from "@/components/admin/Description";
import MultipleImages from "@/components/website/MultipleImages";

export const metadata = {
  title: "Product Page - iSHop",
  description: "Product Page - Swoo Tech Mart",
};


export default async function ProductPage() {
  const productsDataJSON = await getProducts();
  const productData = productsDataJSON.products;

  return (
    <main>
      {/* ================= HEADER ================= */}
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Link
              href={'/admin'}
              className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200"
            >
              <FiChevronLeft className="w-5 h-5 text-slate-600" />
            </Link>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all products listed in your store
              </p>
            </div>
          </div>

          <Link
            href={'/admin/product/add'}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#01A49E] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
          >
            <FaPlus />
            Add Product
          </Link>
        </div>

        {/* ================= PRODUCT LIST TITLE ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Product List</h2>
          </div>

          {/* ================= PRODUCT GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productData?.map((prod) => (
              <article
                key={prod._id}
                className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={productsDataJSON.imageURL + "main_images/" + prod.thumbnail}
                      alt={prod.name}
                      className="w-full h-12 object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 capitalize">
                          {prod.name}
                        </h3>
                        <Description html={prod.description} lines={3} />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex justify-end items-center gap-3">
                            <MultipleImages api_url="/product/add-other-images" product_id={prod._id} other_images={prod.other_images} />
                            <Link
                              href={`/admin/product/edit/${prod._id}`}
                              className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer"
                            >
                              <FiEdit />
                            </Link>
                            <DeleteData url={`product/delete/${prod._id}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-x-2 mt-3">
                  <div className="text-sm font-bold text-slate-900 my-2">Status</div>
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.status} statusType="status" />
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.on_home} statusType="home" />
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.is_best} statusType="best" />
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.is_top} statusType="top" />
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.is_featured} statusType="featured" />
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.is_hot} statusType="hot" />
                  <StatusToggle url={`product/status/${prod._id}`} status={prod.stock} statusType="stock" />
                </div>
              </article>
            ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden lg:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Product</th>
                  <th className="px-5 py-3 text-left font-medium">SKU</th>
                  <th className="px-5 py-3 text-left font-medium">Category</th>
                  <th className="px-5 py-3 text-left font-medium">Color</th>
                  <th className="px-5 py-3 text-left font-medium">Brand</th>
                  <th className="px-5 py-3 text-left font-medium">Price</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-5 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {productData?.map((prod) => (
                  <tr key={prod._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={productsDataJSON.imageURL + "main_images/" + prod.thumbnail}
                          alt={prod.name}
                          className="h-12 w-auto rounded-lg bg-gray-200"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{prod?.name}</p>
                          <p className="text-xs text-gray-500">{prod.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">SKU-908123</td>
                    <td className="px-5 py-4 text-gray-600">{prod?.category_id.name}</td>
                    <td className="px-5 py-4 text-gray-600 flex flex-col gap-1">
                      {prod?.color_ids.map((color) => (
                        <p
                          key={color._id}
                          title={color.name}
                          className="p-2 mx-1 rounded-lg border border-gray-100"
                          style={{ backgroundColor: color.code }}
                        ></p>
                      ))}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{prod?.brand_id?.name}</td>

                    <td className="px-5 py-4">
                      <del className="font-medium text-gray-600">₹{prod?.original_price}</del>
                      <p className="text-xs text-green-600">{prod?.discount_percentage}% off</p>
                      <p className="font-medium text-gray-900">₹{prod?.final_price}</p>
                    </td>

                    <td className="px-5 py-4">
                      <label className="flex flex-wrap items-center gap-2 md:gap-2 hover:cursor-pointer mb-4">
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.status} statusType="status" />
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.on_home} statusType="home" />
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.is_best} statusType="best" />
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.is_top} statusType="top" />
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.is_featured} statusType="featured" />
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.is_hot} statusType="hot" />
                        <StatusToggle url={`product/status/${prod._id}`} status={prod.stock} statusType="stock" />
                      </label>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-3 text-gray-500">
                        <div className="flex justify-end items-center gap-3">
                          <MultipleImages api_url="/product/add-other-images" product_id={prod._id} other_images={prod.other_images} />
                          <Link
                            href={`/admin/product/edit/${prod._id}`}
                            className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer"
                          >
                            <FaEdit />
                          </Link>
                          <DeleteData url={`product/delete/${prod._id}`} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE / TABLET CARDS ================= */}
          <div className="lg:hidden space-y-4 mt-6">
            {productData?.map((prod) => (
              <div key={prod._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex gap-4">
                  <img
                    src={productsDataJSON.imageURL + "main_images/" + prod.thumbnail}
                    alt={prod.name}
                    className="h-12 w-12 rounded-lg bg-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900">{prod.name}</h3>
                      <p className="text-xs text-gray-500">{prod.slug}</p>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">SKU-908123</p>

                    <div className="flex items-center gap-4 mt-2">
                      <del className="font-semibold text-gray-600">${prod.original_price}</del>
                      <span className="text-xs text-green-600">{prod.discount_percentage}% off</span>
                      <p className="font-semibold text-gray-900">${prod.final_price}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      <StatusToggle url={`category/status/${prod._id}`} status={prod.status} statusType="status" />
                      <StatusToggle url={`category/status/${prod._id}`} status={prod.on_home} statusType="home" />
                      <StatusToggle url={`category/status/${prod._id}`} status={prod.is_best} statusType="best" />
                      <StatusToggle url={`category/status/${prod._id}`} status={prod.is_top} statusType="top" />
                      <StatusToggle url={`category/status/${prod._id}`} status={prod.is_featured} statusType="featured" />
                      <StatusToggle url={`category/status/${prod._id}`} status={prod.is_hot} statusType="hot" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          href={`/admin/product/edit/${prod._id}`}
                          className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer"
                        >
                          <FaEdit />
                        </Link>
                        <DeleteData url={`product/delete/${prod._id}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main >
  );
}