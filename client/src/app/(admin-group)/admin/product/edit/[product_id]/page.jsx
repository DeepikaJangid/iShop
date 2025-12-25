import React from 'react'
import { getProductById } from "@/api-calls/product";

import ProductEdit from '@/components/admin/ProductEdit';

export const metadata = {
  title: "Product Edit Page - iSHop",
  description: "Product Edit Page - Swoo Tech Mart",
};

export default async function ProductEditPage({ params }) {
  const resolvePromise = await params;
  const id = resolvePromise?.product_id;
  const productJSON = await getProductById(id);
  const imageURL = productJSON?.imageURL + "main_images/" + productJSON?.product.thumbnail;
  return (
    <ProductEdit product={productJSON.product} imageURL={imageURL} />
  )
}
