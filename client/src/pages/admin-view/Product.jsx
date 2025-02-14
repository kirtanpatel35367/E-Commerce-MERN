import CommonForm from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import ProductImageUpload from '@/components/admin-view/image-upload'
import { addProductFormElements } from '@/config'
import React, { useState } from 'react'

const AdminProducts = () => {

  const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
  }

  
  const onsubmit = (e) => {
    console.log(e.target.value)
  }
  
  const [openProductDialoge, setOpenProductDialoge] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImagefile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState("")
  const [imageLoadingstate, setImageLoadingstate] = useState(false)
  
  console.log(formData)
  return (
    <>
      <div className='flex justify-end w-full'>
        <Button onClick={() => setOpenProductDialoge(true)}>
          Add New Product
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openProductDialoge} onOpenChange={() => setOpenProductDialoge(false)}>
          <SheetContent side='right' className='overflow-auto'>
            <SheetHeader>
              <SheetTitle className='mb-3 font-bold text-xl font-HeadFont'>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload imageFile={imageFile} setImagefile={setImagefile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingstate={setImageLoadingstate} />
            <CommonForm formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttontext='Add Item' onsubmit={onsubmit} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default AdminProducts
