import { ProductFilter } from '@/components/shopping-view/Filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TbSortAscending } from "react-icons/tb";
import React, { useEffect, useState } from 'react'
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopProducts } from '@/store/product-slice';
import FetchShoppingProducts from '@/components/shopping-view/shoppingProducts';
import { createSearchParams, useSearchParams } from 'react-router-dom';



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
  const { productList } = useSelector(state => state.shopProducts)

  const [sort, setSort] = useState(null)
  const [filter, setFilter] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()



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


  useEffect(() => {
    setSort('price-lowtohigh')
    const filters = sessionStorage.getItem('filters');
    setFilter(filters != undefined ? JSON.parse(filters) : {});
  }, [])


  useEffect(() => {
    if (filter && Object.entries(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filter])


  useEffect(() => {
    dispatch(fetchShopProducts())
  }, [dispatch])

  console.log(searchParams)
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
                <FetchShoppingProducts key={productItem._id} product={productItem} />) : <></>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductListing
