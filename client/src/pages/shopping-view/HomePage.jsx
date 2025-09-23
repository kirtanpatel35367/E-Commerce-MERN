import React, { useEffect } from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProducts } from "@/store/product-slice";
import { genderwiseProducts } from "@/config";
import menInage from "../../assets/menImage.jpg";
import { Card, CardContent } from "@/components/ui/card";
import FetchShoppingProducts from "@/components/shopping-view/shoppingProducts";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    const currentfilter = {
      [section]: [getCurrentItem],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentfilter));
    navigate("/shop/productList");
  }

  useEffect(() => {
    dispatch(fetchShopProducts({ filterParams: {}, sortParams: {} }));
  }, [dispatch]);

  return (
    //
    <section className="relative">
      {/* <div className="absolute inset-0 gradient-hero opacity-10"></div> */}
      <div className="container mx-auto px-4 py-20 md:py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* <Star className="h-5 w-5 fill-primary text-primary animate-pulse" /> */}
                  <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-medium text-primary animate-fade-in">
                  Limited Time Offers
                </span>
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  SALE
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="relative">
                  Mega
                  <div className="absolute -top-2 -right-8 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm px-2 py-1 rounded-full animate-pulse transform rotate-12">
                    50% OFF
                  </div>
                </span>
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-[#682c0d] animate-fade-in">
                  {" "}
                  Sale
                </span>
                <br />
                <span className="relative">
                  Event!
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-red-500 animate-pulse"></div>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                🔥 Incredible deals on premium products! Limited time only.
                <span className="text-primary font-semibold animate-pulse">
                  {" "}
                  Don't miss out!
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button size="lg" variant="hero" className="text-lg px-8 py-6">
                Shop Collection
                {/* <ArrowRight className="h-5 w-5" /> */}
              </button>{" "}
              <button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 hover-lift"
              >
                Learn More
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">
                  Unique Products
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="absolute inset-0 gradient-primary rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg animate-bounce shadow-lg z-10">
              🎉 FLASH SALE!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm animate-pulse z-10">
              ⚡ Fast Delivery
            </div>
            <img
              src={banner1}
              alt="Special sale products with amazing discounts - EZBuy flash sale"
              className="relative rounded-3xl shadow-elegant hover-lift w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
