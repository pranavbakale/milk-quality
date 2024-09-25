import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const ForgotPassword = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const response = await fetch('http://localhost:5000/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    // Password reset email sent successfully
                    console.log("response from password reset", response);
                    setErrorMessage('Password reset email has been sent. Please check your email inbox.');
                    // router.push('/auth/password-reset-sent');

                } else {
                    // Handle error response from the server
                    const errorData = await response.json();
                    // Display error message to the user
                    console.error(errorData.message);
                    setErrorMessage(errorData.message);
                }
            } catch (error) {
                console.error('Something went wrong:', error);
                setErrorMessage('Something went wrong. Please try again later.');
            }
            setIsSubmitting(false);
        },
    });

    return (

        <Box
            sx={{
                backgroundColor: 'background.paper',
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    maxWidth: 550,
                    px: 3,
                    py: '100px',
                    width: '100%'
                }}
            >
                <Box>
                    <Typography variant="h4">Forgot Password</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </form>
                    {errorMessage && (
                        <Typography color="error"
                            variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>

    );
};

export default ForgotPassword;
