import CommonForm from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import ProductImageUpload from '@/components/admin-view/image-upload'
import { addProductFormElements } from '@/config'
import React, { useEffect, useState } from 'react'
import FetchAdminProducts from '../../components/admin-view/adminproduct'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, addNewProduct } from '@/store/admin/product-slice'
import { useToast } from '@/hooks/use-toast'

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



  const [openProductDialoge, setOpenProductDialoge] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImagefile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState("")
  const [imageLoadingstate, setImageLoadingstate] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.adminproducts)
  const { toast } = useToast()

  const onsubmit = (e) => {
    e.preventDefault()
    dispatch(addNewProduct(
      {
        ...formData,
        image: uploadImageUrl
      }
    )).then((data) => {
      if (data?.payload?.sucess) {
        dispatch(fetchAllProducts())
        setOpenProductDialoge(false)
        setImagefile(null)
        setFormData(initialFormData)
        toast({
          title: data.payload.message,
          variant: "success"
        })
        setOpenProductDialoge(false)
      }
      else {
        toast({
          title: data.payload.message,
          variant: "destructive"
        })
        setOpenProductDialoge(false)
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(productList)
  console.log(uploadImageUrl)

  return (
    <>
      <div className='flex justify-end w-full'>
        <Button onClick={() => setOpenProductDialoge(true)}>
          Add New Product
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ? productList.map((productItem) =>
            <FetchAdminProducts key={productItem._id} formData={formData} setFormData={setFormData} currentEditedId={currentEditedId} setCurrentEditedId={setCurrentEditedId} setOpenProductDialoge={setOpenProductDialoge} product={productItem} />
          ) : null
        }
      </div>
      <Sheet open={openProductDialoge} onOpenChange={() => setOpenProductDialoge(false)}>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle className='mb-3 font-bold text-xl font-HeadFont'>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImagefile={setImagefile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingstate={setImageLoadingstate} imageLoadingstate={imageLoadingstate} />
          <CommonForm formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttontext='Add Item' onsubmit={onsubmit} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts
