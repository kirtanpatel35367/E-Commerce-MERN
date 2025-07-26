import React, { useEffect } from 'react'
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShopProducts } from '@/store/product-slice'
import { genderwiseProducts } from '@/config'
import menInage from '../../assets/menImage.jpg'
import { Card, CardContent } from '@/components/ui/card'
import FetchShoppingProducts from '@/components/shopping-view/shoppingProducts'
import { useNavigate } from 'react-router-dom'



const HomePage = () => {
  const { productList } = useSelector(state => state.shopProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleNavigateListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters')

    const currentfilter = {
      [section]: [getCurrentItem]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentfilter))
    navigate('/shop/productList')
  }


  useEffect(() => {
    dispatch(fetchShopProducts({ filterParams: {}, sortParams: {} }))
  }, [dispatch])

  return (

    <div className='flex flex-col min-h-screen '>

      <div className='relative w-full h-screen'>
        <img
          src={banner1}
          className=' w-full h-screen object-cover'
        ></img>
      </div>

      <section className='py-12 bg-grey-50'>
        <div className='flex justify-center items-center mx-auto px-4'>
          <h2 className='font-semibold  md:text-xl lg:text-4xl font-HeadFont '>All Your Needs Here!!</h2>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center  w-full m-3 h-[300px] bg-orange-900'>
          {
            genderwiseProducts.map((item) =>
              <Card onClick={() => handleNavigateListingPage(item.id, 'Category')} className='cursor-pointer hover:shadow-lg'>
                <CardContent className='flex flex-col items-center justify-center'>
                  <item.icon className='w-16 h-16' />
                  <span>{item.label}</span>
                </CardContent>
              </Card>
            )

          }
        </div>
      </section>

      <section>
        <div className='py-12'>
          <h2 className='conatiner px-auto text-center font-semibold  md:text-xl lg:text-4xl font-HeadFont'>Brand Wise Collections</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full m-3 h-[300px] 0'>
            {
              productList && productList.length > 0 ? productList.slice(0, 4).map((product) =>
                <div onClick={()=>navigate('/shop/productList')}>
                  <FetchShoppingProducts  product={product} />
                </div>
              ) : null
            }
          </div>
        </div>

      </section>

    </div>

  )
}

export default HomePage
