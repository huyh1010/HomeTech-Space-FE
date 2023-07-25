import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { FCheckbox, FTextField, FormProvider } from "../components/form";
import useAuth from "../hooks/useAuth";

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const loginSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
function LoginPage() {
  const auth = useAuth();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    let { email, password } = data;
    try {
      await auth.login({ email, password });
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
          <Alert severity="info">
            Don't have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>
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
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />
          <Link to="/" variant="subtitle2" component={RouterLink}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
