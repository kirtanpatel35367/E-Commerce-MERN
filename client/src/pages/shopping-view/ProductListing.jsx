import { ProductFilter } from '@/components/shopping-view/Filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TbSortAscending } from "react-icons/tb";
import React, { useEffect, useState } from 'react'
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopProducts, getproductDetails } from '@/store/product-slice';
import FetchShoppingProducts from '@/components/shopping-view/shoppingProducts';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import ProductDetailsDialog from '@/components/shopping-view/ProductDetails';
import { addtoCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';


function createSearchParamsHelper(filterParams) {
  const queryParams = []

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  return queryParams.join("&")
}





const ProductListing = () => {

  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const { cartItems } = useSelector(state => state.shoppingcart)
  const { user } = useSelector(state => state.auth)

  const [sort, setSort] = useState(null)
  const [filter, setFilter] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { toast } = useToast()



  function handleSort(value) {
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let Filters = { ...filter };
    const indexOfCurrentSection = Object.keys(Filters).indexOf(getSectionId)


    if (indexOfCurrentSection === -1) {
      Filters = {
        ...Filters,
        [getSectionId]: [getCurrentOption]
      }
    }
    else {
      const indexOfCurrentOption = Filters[getSectionId].indexOf(getCurrentOption)

      if (indexOfCurrentOption === -1) {
        Filters[getSectionId].push(getCurrentOption)
      }
      else {
        Filters[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilter(Filters)
    sessionStorage.setItem('filters', JSON.stringify(Filters))
  }

  function handleGetProductDetails(productId) {
    dispatch(getproductDetails(productId))
  }

  //Handle Add To Cart when User Click
  function handleAddtoCart(productId) {
    console.log(productId)
    dispatch(addtoCart({ userId: user?.id, productId: productId, quantity: 1 })).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title:data.payload.message,
          variant:"success"
        })
      }
    })
  }

  //For Open Dialog ox When User Click ON Card
  useEffect(() => {
    if (productDetails != null) setOpenDetailsDialog(true)
  }, [productDetails])

  //For Sorting and set Filters in Session Storage for persiatant Data
  useEffect(() => {
    setSort('price-lowtohigh')
    const filters = sessionStorage.getItem('filters');
    setFilter(filters != undefined ? JSON.parse(filters) : {});
  }, [])

  //For Use UseParams for Filtering
  useEffect(() => {
    if (filter && Object.entries(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filter])

  //Dispatch Action  fetchShopProducts for Filtering and Sorting
  useEffect(() => {
    if (filter != null && sort != null)
      dispatch(fetchShopProducts({ filterParams: filter, sortParams: sort }))
  }, [dispatch, filter, sort])



  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen font-HeadFont'>
        <ProductFilter filter={filter} handleFilter={handleFilter} />
        <div className='bg-background w-full rounded-lg shadow-sm'>
          <div className='p-4 border-b font-bold flex items-center justify-between gap-4'>
            <h2 className='text-lg font-semibold'>All Products</h2>
            <div className='flex items-center gap-2'>
              <span>{productList.length} Products</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='sm' className='flex items-center'>
                    <TbSortAscending />
                    <span>sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                    {
                      sortOptions.map((sortItem) =>
                        <div key={sortItem.id}>
                          <DropdownMenuRadioItem value={sortItem.id} className='cursor-pointer'>
                            {
                              sortItem.label
                            }
                          </DropdownMenuRadioItem>
                        </div>
                      )
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mx-2'>
            {
              productList && productList.length > 0 ? productList.map((productItem) =>
                <FetchShoppingProducts handleAddtoCart={handleAddtoCart} handleGetProductDetails={handleGetProductDetails} key={productItem._id} product={productItem} />) : <></>
            }
          </div>
        </div>
        <ProductDetailsDialog handleAddtoCart={handleAddtoCart} open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
      </div>
    </>
  )
}

export default ProductListing
