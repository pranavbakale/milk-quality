// PasswordResetPage.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';

const PasswordResetPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            newPassword: Yup
                .string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
            confirmPassword: Yup
                .string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const token = router.query.token; // Extract token from query params
                const response = await fetch(`http://localhost:5000/reset-password?token=${token}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newPassword: values.newPassword }),
                });

                if (response.ok) {
                    // Password reset successful
                    router.push('/auth/password-reset-success');
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
                    <Typography variant="h4">Reset Password</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="newPassword"
                            name="newPassword"
                            label="New Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                        />
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default PasswordResetPage;
