'use client'

import { axiosApiInstance } from '@/helper/helper';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function DeleteData({ id }) {
    const router = useRouter();

    const deleteHandler = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                axiosApiInstance.delete(`category/delete/${id}`).then(
                    (response) => {
                        if (response.data.flag == 1) {
                            router.refresh();
                        }
                        toast.success(response.data.msg)
                    }
                ).catch(
                    (error) => {
                        toast.warning(error.data.msg);
                    }
                )
            }
        });


    }

    return (
        <button onClick={deleteHandler}
            className="text-red-600 hover:text-red-800 transition hover:cursor-pointer"><FaTrash /></button>
    )
}
