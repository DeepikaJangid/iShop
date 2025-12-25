import React from 'react'
import { getColorById } from '@/api-calls/colors';
import ColorEdit from '@/components/admin/ColorEdit'

export default async function page({ params }) {
    const resolvePromise = await params;
    const id = resolvePromise?.color_id;
    const colorJSON = await getColorById(id);

    return (
        <ColorEdit colorData={colorJSON.color} />
    )
}
