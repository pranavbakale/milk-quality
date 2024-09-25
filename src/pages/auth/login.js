
import { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import ForgotPassword from "./ForgotPassword";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // If the user is already authenticated, redirect them to the homepage
    if (auth.isAuthenticated) {
      router.push("/");
    }
  }, [auth.isAuthenticated, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {

      try {

        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem('token', userData.token);
          auth.signIn(userData);
          auth.setAuthenticated(true);
          router.push('/');
        } else {
          const errorData = await response.json();
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.error || 'Authentication failed' });

          localStorage.setItem("token", userData.token);
          auth.signIn(userData);
          auth.setAuthenticated(true);
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    }
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  return (
    <>
      {showForgotPassword ? (
        <ForgotPassword />
      ) : (
        <>
          <Head>
            <title>Login</title>
          </Head>
          <Box
            sx={{
              backgroundColor: "background.paper",
              flex: "1 1 auto",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                py: "100px",
                width: "100%",
              }}
            >
              <div>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  <Typography variant="h4">Login</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Don&apos;t have an account? &nbsp;
                    <Link
                      component={NextLink}
                      href="/auth/register"
                      underline="hover"
                      variant="subtitle2"
                    >
                      Register
                    </Link>
                  </Typography>
                </Stack>
                <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
                  <Tab label="Email" value="email" />
                </Tabs>
                {method === "email" && (
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                      />
                      <TextField
                        error={!!(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                      />
                    </Stack>
                    {formik.errors.submit && (
                      <Typography color="error" sx={{ mt: 3 }} variant="body2">
                        {formik.errors.submit}
                      </Typography>
                    )}
                    <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                      Continue
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                      onClick={handleForgotPasswordClick}
                    >
                      Forgot Password?
                    </Button>
                  </form>
                )}
              </div>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
