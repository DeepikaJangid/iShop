import React from 'react'
import BrandEdit from '@/components/admin/BrandEdit'
import { getBrandById } from '@/api-calls/brand';

export const metadata = {
  title: "Edit Brand Page - iSHop",
  description: "Edit Brand Page - Swoo Tech Mart",
};

export default async function BrandEditPage({ params }) {
  const resolvePromise = await params;
  const id = resolvePromise?.brand_id;
  const brandJSON = await getBrandById(id);
  const imageURL = brandJSON?.imageURL + brandJSON?.brand.image_name;
  return (
    <BrandEdit brand={brandJSON.brand} imageURL={imageURL} />
  )
}
