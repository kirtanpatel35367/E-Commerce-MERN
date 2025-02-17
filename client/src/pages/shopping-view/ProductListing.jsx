import { ProductFilter } from '@/components/shopping-view/Filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TbSortAscending } from "react-icons/tb";
import React, { useEffect, useState } from 'react'
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopProducts } from '@/store/product-slice';
import FetchShoppingProducts from '@/components/shopping-view/shoppingProducts';


const ProductListing = () => {

  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.shopProducts)

  const [sort, setSort] = useState("")

  function handleSort(value) {
    console.log(value)
  }

  useEffect(() => {
    dispatch(fetchShopProducts())
  }, [dispatch])


  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen font-HeadFont'>
        <ProductFilter />
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
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
            {
              productList && productList.length > 0 ? productList.map((productItem) =>
                <FetchShoppingProducts key={productItem._id} product={productItem} />) : <></>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductListing
