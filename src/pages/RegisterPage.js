import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { FTextField, FormProvider } from "../components/form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password must match"),
});

// const textBorder = {
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#181212",
//     },
//     "&:hover fieldset": {
//       borderColor: "#181212",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#181212",
//     },
//     "& .MuiOutlinedInput-input": {
//       color: "black",
//     },
//   },
// };

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    React.useState(false);

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { name, email, password } = data;

    try {
      await auth.register({ name, email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert
            severity="info"
            sx={{ backgroundColor: "#e5f6fd", color: "#181212" }}
          >
            Already have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Sign in
            </Link>
          </Alert>
          <FTextField name="name" label="Full name" />
          <FTextField name="email" label="Email" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          sx={{ my: 2.5 }}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
