import React from "react";
import HomeBanner from "../components/HomeBanner";
import CategoriesBanner from "../features/category/CategoriesBanner";
import BundleBanner from "../features/bundle/BundleBanner";
import NewProductList from "../features/product/NewProductList";
import AboutUs from "../components/AboutUs";

function HomePage() {
  return (
    <div>
      <HomeBanner />
      <CategoriesBanner />
      <BundleBanner />
      <NewProductList />
      <AboutUs />
    </div>
  );
}

export default HomePage;
