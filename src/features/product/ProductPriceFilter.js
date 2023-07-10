import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { getProducts } from "../product/productSlice";
import { useDispatch } from "react-redux";

function ProductPriceFilter({ priceFilters, price, setPrice }) {
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    try {
      setPrice(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getProducts({ price: price }));
  }, [dispatch, price]);

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {priceFilters.map((filter) => (
          <FormControlLabel
            value={filter.value}
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label={filter.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default ProductPriceFilter;
