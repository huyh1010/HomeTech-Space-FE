import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <Grid
      container
      spacing={2}
      mt={1}
      justifyContent={{ xs: "center", sm: "start", md: "start", lg: "start" }}
      alignItems={{ xs: "center", sm: "start", md: "start", lg: "start" }}
    >
      {products?.map((product, index) => (
        <Grid key={product._id} item xs={11} sm={6} md={5} lg={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
