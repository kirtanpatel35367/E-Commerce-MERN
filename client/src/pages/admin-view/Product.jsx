import CommonForm from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import ProductImageUpload from '@/components/admin-view/image-upload'
import { addProductFormElements } from '@/config'
import React, { useEffect, useState } from 'react'
import FetchAdminProducts from '../../components/admin-view/adminproduct'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, addNewProduct, editProducts, deleteproduct } from '@/store/admin/product-slice'
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
  const [isEditMode, setIsEditMode] = useState(false);



  //Edit and Create New Product
  const onsubmit = async (e) => {

    e.preventDefault();

    currentEditedId != null ?

      dispatch(editProducts({
        id: currentEditedId,
        productData: {
          ...formData
        }
      })).then((response) => {
        if (response?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData)
          setOpenProductDialoge(false);

          toast({
            title: "Product Edited Succesfully",
            variant: "success"
          });

        }
      }) :

      dispatch(addNewProduct({
        ...formData,
        image: uploadImageUrl
      })).then((response) => {
        if (response?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenProductDialoge(false);
          setImagefile(null);
          setFormData(initialFormData);

          toast({
            title: response.payload.message,
            variant: "success"
          });
        } else {
          toast({
            title: response?.payload?.message || "Something went wrong",
            variant: "destructive"
          });
        }
      })
  };


//Delete PRoduct From DB
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await dispatch(deleteproduct(productId));

      console.log(response)

      if (response?.payload?.success) {
        toast({
          title: "Product deleted successfully",
          variant: "success"
        });
      } else {
        toast({
          title: response?.payload?.message || "Failed to delete product",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error while deleting product:", error);
      toast({
        title: "Error",
        description: "Something went wrong while deleting the product.",
        variant: "destructive"
      });
    }
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== '' || key === 'image' || formData[key])
      .every((item) => item);
}

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])


  return (
    <>
      <div className='flex justify-end w-full'>
        <Button onClick={() => {
          setIsEditMode(false)
          setOpenProductDialoge(true);
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}>
          Add New Product
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ? productList.map((productItem) =>
            <FetchAdminProducts key={productItem._id} formData={formData} setFormData={setFormData} currentEditedId={currentEditedId} setCurrentEditedId={setCurrentEditedId} setOpenProductDialoge={setOpenProductDialoge} product={productItem} setIsEditMode={setIsEditMode} handleDeleteProduct={handleDeleteProduct} isFormValid={isFormValid} />
          ) : null
        }
      </div>
      <Sheet open={openProductDialoge} onOpenChange={() => setOpenProductDialoge(false)}>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle className='mb-3 font-bold text-xl font-HeadFont'>{
              currentEditedId != null ? "Edit Product" : "Add New Product"
            }</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImagefile={setImagefile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoadingstate={setImageLoadingstate} imageLoadingstate={imageLoadingstate} isEditMode={isEditMode} />
          <CommonForm formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttontext={currentEditedId != null ? "Edit" : "Add"} onsubmit={onsubmit} isButtonDisabled={!isFormValid()} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts
