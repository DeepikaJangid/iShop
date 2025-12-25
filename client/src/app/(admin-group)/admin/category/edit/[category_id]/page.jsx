import React from 'react'
import { getCategoryById } from "@/api-calls/category";
import CategoryEdit from '@/components/admin/CategoryEdit';

export const metadata = {
  title: "Category Edit Page - iSHop",
  description: "Category Edit Page - Swoo Tech Mart",
};

export default async function CategoryEditPage({ params }) {
  const resolvePromise = await params;
  const id = resolvePromise?.category_id;
  const categoryJSON = await getCategoryById(id);
  const imageURL = categoryJSON?.imageURL + categoryJSON?.category.image_name;
  return (
    <CategoryEdit category={categoryJSON.category} imageURL={imageURL} />
  )
}
