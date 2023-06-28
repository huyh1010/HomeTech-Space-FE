import { Controller, useFormContext } from "react-hook-form";

import { FormHelperText } from "@mui/material";
import UploadAvatar from "../UploadAvatar";

function FUploadAvatar({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadAvatar
            {...other}
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

export default FUploadAvatar;
