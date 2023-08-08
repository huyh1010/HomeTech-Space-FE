import React, { useEffect } from "react";
import HomeBanner from "../components/HomeBanner";
import CategoriesBanner from "../features/category/CategoriesBanner";
import BundleBanner from "../features/bundle/BundleBanner";
import NewProductList from "../features/product/NewProductList";
import AboutUs from "../components/AboutUs";
import { useLocation, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HomePage() {
  const auth = useAuth();
  const search = useLocation().search;
  const googleId = new URLSearchParams(search).get("googleId");
  console.log(googleId);

  useEffect(() => {
    if (googleId) {
      auth.loginWithGoogle({ googleId });
    }
  }, [googleId, auth]);

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
