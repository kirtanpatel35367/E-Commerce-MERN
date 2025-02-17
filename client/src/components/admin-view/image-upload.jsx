import { useEffect, useRef } from "react"
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { FaFileImage } from "react-icons/fa";
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ imageFile, setImagefile, uploadImageUrl, setUploadImageUrl, setImageLoadingstate, imageLoadingstate, isEditMode }) {
    const inputRef = useRef()
    function handleImageChange(e) {
        console.log(e.target.files)
        const selectedFile = e.target.files?.[0]
        if (selectedFile) setImagefile(selectedFile)
    }

    function handleDragOver(e) {
        e.preventDefault()

    }

    function handleDrop() {
        e.preventDefault()
        const droppedfile = e.dataTransfer.files?.[0];
        if (droppedfile) setImagefile(droppedfile)
    }

    function handleRemoveImage() {
        setImagefile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    async function uploadImageCloudinary() {
        setImageLoadingstate(true)
        const data = new FormData()
        data.append('Image_file', imageFile)
        const response = await axios.post('http://localhost:9000/api/admin/products/uploadImage', data)
        setImageLoadingstate(false)
        if (response?.data?.success) { setUploadImageUrl(response.data.result.url) }
    }

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageCloudinary()
        }
    }, [imageFile])


    return (
        <div className="w-full max-w-md mx-auto">
            <label className="text-lg font-semibold" htmlFor="productimage">Upload Image</label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className=" flex flex-col border-2 w-full h-32 items-center justify-center  rounded-md bg-muted/40 my-4">
                <Input type='file' className='hidden' id='image-upload' ref={inputRef} onChange={handleImageChange} disabled={isEditMode}></Input>
                {
                    !imageFile ? (
                        <label htmlFor="image-upload" className="flex flex-col items-center">
                            <IoCloudUploadOutline
                                className={`${isEditMode ? 'cursor-not-allowed' : 'cursor-pointer'} text-2xl`}/>
                                <span>Drag and Drop Image Here</span>
                        </label>
                    ) : (
                        imageLoadingstate ? (
                            <Skeleton className='h-10 bg-gray-400' />
                        ) : (<>
                            <div className="flex justify-around items-center gap-3">
                                <div className="flex items-center">
                                    <FaFileImage className="text-lg" />
                                </div>
                                <p>{imageFile.name}</p>
                                <Button className='flex justify-center items-center' variant='ghost' size='icon' onClick={handleRemoveImage}>
                                    <CiCircleRemove className="w-4 h-4" />
                                </Button>
                            </div>
                        </>)

                    )
                }
            </div >
        </div >
    )
}

export default ProductImageUpload