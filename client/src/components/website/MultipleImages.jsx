'use client'
import React, { useState } from 'react'
import { FcGallery } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import FileUpload from "@/components/common/FileUpload";
import { axiosApiInstance } from '@/helper/helper';

export default function MultipleImages({ api_url, product_id, other_images }) {
    const [uploadStatus, setUploadStatus] = useState(false);
    const [otherImages, setOtherImages] = useState(other_images);
    const [imageFiles, setImageFiles] = useState([]);
    const [toggle, setToggle] = useState(false);

    const fileChangeHanlder = (images) => {
        const temp = [];
        if (images.length !== 0) {
            for (let img of images) {
                temp.push(img.file);
            }
            setImageFiles(temp);
        }
    }

    const uploadHandler = () => {
        const formData = new FormData();
        for (let imgFile of imageFiles) {
            formData.append("other_images", imgFile);
        }
        formData.append("product_id", product_id);
        setUploadStatus(false);
        axiosApiInstance.post(api_url, formData).then(
            (response) => {
                if (response.data.flag === 1) {
                    setUploadStatus(true);
                    setOtherImages(response.data.updated_other_images);
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
            <FcGallery
                onClick={() => setToggle(true)}
                className="text-xl hover:cursor-pointer" />

            <div className={`${toggle ? "flex" : "hidden"} flex-col min-h-screen w-full fixed top-0 left-0 z-50 justify-center items-center gap-3`}
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>

                <div className='max-w-[650px] bg-white rounded p-4 w-full relative'>
                    {/* Close Button */}
                    <button
                        onClick={() => setToggle(false)}
                        className="absolute hover:cursor-pointer top-6 right-3 text-xl font-bold text-gray-600 hover:text-gray-900">
                        <RxCross2 className='p-1 rounded text-red-500 hover:bg-red-50 text-2xl' />
                    </button>

                    <div className='text-xl font-semibold mb-3'>Existing Images</div>
                    <div className='grid grid-cols-3 gap-2'>
                        {
                            otherImages?.map((img, idx) => (
                                <div key={idx} className='h-[100px]'>
                                    <img
                                        className='p-2 w-full h-full object-contain'
                                        src={`http://localhost:5000/images/product/other_images/${img}`} />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='max-w-[650px] bg-white rounded p-4 w-full'>
                    <div className='text-xl font-semibold mb-3'>Add More Images</div>
                    <FileUpload
                        uploadStatus={uploadStatus}
                        onFilesChange={fileChangeHanlder}
                        maxFiles={6}
                        maxSize={4 * 1024 * 1024}
                        multiple={true}
                        className='my-5' />
                    <button
                        onClick={uploadHandler}
                        className="inline-flex items-center justify-center rounded-lg bg-[#01A49E] px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-[#01918C] hover:cursor-pointer">
                        Upload
                    </button>
                </div>
            </div>
        </>
    )
}