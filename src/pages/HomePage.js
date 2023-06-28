import React from "react";
import HomeBanner from "../components/HomeBanner";
import CategoriesBanner from "../features/category/CategoriesBanner";
import BundleBanner from "../features/bundle/BundleBanner";
import NewProductList from "../features/product/NewProductList";
import AboutUs from "../components/AboutUs";

function HomePage() {
  return (
    <>
      <HomeBanner />
      <CategoriesBanner />
      <BundleBanner />
      <NewProductList />
      <AboutUs />
    </>
  );
}

export default HomePage;
