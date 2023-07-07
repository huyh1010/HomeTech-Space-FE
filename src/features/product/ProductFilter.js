import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import FRadioGroup from "../../components/form/FRadioGroup";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const FILTER_CATEGORY_OPTIONS = [
  "speaker",
  "plugs and outlets",
  "cameras",
  "lighting",
  "alarm clock",
  "scale",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below_25", label: "Below $25" },
  { value: "between_25_75", label: "Between $25 - $75" },
  { value: "above_75", label: "Above $75" },
];
function ProductFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Card sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Category
          </Typography>
          <Divider />
          <FRadioGroup
            name="category"
            options={FILTER_CATEGORY_OPTIONS}
            row={false}
          />
        </Stack>
      </Card>
      <Card sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Price
          </Typography>
          <Divider />
          <FRadioGroup
            name="priceRange"
            options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
            getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
          />
        </Stack>
      </Card>
      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
