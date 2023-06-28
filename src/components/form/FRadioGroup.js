import { useFormContext, Controller } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";

function FRadioGroup({ name, options, getOptionLabel, ...other }) {
  const dispatch = useDispatch();
  const { control } = useFormContext();

  const handleChange = async (e) => {
    const category = e.target.value;
    try {
      dispatch(getProducts({ category }));
    } catch (error) {
      console.log(error);
    }
  };
  const styles = (theme) => ({
    radio: {
      "&$checked": {
        color: "#4B8DF8",
      },
    },
    checked: {},
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other} onChange={handleChange}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "black",
                      },
                    }}
                  />
                }
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

export default FRadioGroup;
