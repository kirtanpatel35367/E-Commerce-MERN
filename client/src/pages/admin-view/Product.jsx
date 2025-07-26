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
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { TbH1 } from 'react-icons/tb'
const AdminProducts = () => {

  //Use React Hook Form

  const { register, control, handleSubmit, watch, setValue, reset, getValues } = useForm({
    defaultValues: {}
  })

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
  const onSubmit = async (Data) => {

    currentEditedId != null ?
      dispatch(editProducts({
        id: currentEditedId,
        productData: {
          title: Data.title,
          brand: Data.brand,
          description: Data.description,
          price: Data.price,
          salePrice: Data.salePrice,
          totalStock: Data.totalStock,
          category: Data.category
        }
      })).then((response) => {
        if (response?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData)
          setOpenProductDialoge(false);
          setCurrentEditedId(null)
          toast({
            title: "Product Edited Succesfully",
            variant: "success"
          });

        }
      }) :

      dispatch(addNewProduct({
        ...Data,
        image: uploadImageUrl
      })).then((response) => {
        if (response?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenProductDialoge(false);
          setImagefile(null);
          setFormData({});

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
    reset(formData)
  }, [dispatch, formData])

  console.log(formData)


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

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3'>
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <input

                  placeholder="Enter Title"
                  type="text"
                  {...register("title")}
                  onChange={(e) => setValue("title", e.target.value)}
                  className="mt-1 p-2 border rounded-md  focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter Description"

                  type="text"
                  {...register("description")}
                  className="mt-1 p-2 border rounded-md  focus:outline-none"
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="category" className="text-sm font-medium">Category</label>

                <Controller
                  name='category'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ? { value: field.value, label: field.value } : null}
                      options={addProductFormElements[0].options}
                      onChange={((selectedOption) => field.onChange(selectedOption?.label))}
                    />)}
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="brand" className="text-sm font-medium">Brand</label>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ? { value: field.value, label: field.value } : null}
                      options={addProductFormElements[1].options}
                      onChange={((selectedOption) => field.onChange(selectedOption?.label))}
                    />)}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="price" className="text-sm font-medium">Price</label>
                <input
                  placeholder="Enter Price"
                  type="number"
                  {...register("price")}
                  className="mt-1 p-2 border rounded-md  focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="saleprice" className="text-sm font-medium">Sale Price</label>
                <input
                  placeholder="Enter Price"
                  type="number"
                  {...register("salePrice")}
                  className="mt-1 p-2 border rounded-md  focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="totalStock" className="text-sm font-medium">Total Stock</label>
                <input
                  placeholder="Enter Price"
                  type="number"
                  {...register("totalStock")}
                  className="mt-1 p-2 border rounded-md  focus:outline-none"
                />
              </div>

              <button
                className="bg-[#0e1e49] text-white rounded-md px-4 py-2 cursor-pointer hover:bg-[#1e2754ea] transition-all duration-300"
                type="submit"
              >
                Add New Product
              </button>
            </div>
          </form>


          {/* <CommonForm formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttontext={currentEditedId != null ? "Edit" : "Add"} onsubmit={onsubmit} isButtonDisabled={!isFormValid()} /> */}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts
