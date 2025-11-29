'use client'
import { axiosApiInstance } from '@/helper/helper';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FiTrash2 } from "react-icons/fi";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function DeleteData({ url }) {
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

                axiosApiInstance.delete(url).then(
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
            className="p-2 rounded-md text-red-600 hover:bg-red-50 hover:cursor-pointer"><FiTrash2 /></button>
    )
}
