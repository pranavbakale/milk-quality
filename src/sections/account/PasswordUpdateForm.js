import { useState, useCallback } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
} from '@mui/material';
import axios from 'axios';

export const PasswordUpdateForm = ({ onSuccess, onCancel }) => {
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async () => {
        // Validation
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await axios.put(
                `http://localhost:5000/update-password?token=${token}`,
                { newPassword: passwords.newPassword }
            );
            console.log(response.data);

            // Reset password fields
            setPasswords({
                newPassword: '',
                confirmPassword: '',
            });

            onSuccess(); // Password updated successfully
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Failed to update password');
        }
    }, [passwords, onSuccess]);

    return (
        <Card>
            <CardContent>
                <Box sx={{ m: -1.5 }}>
                    <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        onChange={handleChange}
                        value={passwords.newPassword}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        value={passwords.confirmPassword}
                        required
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button onClick={handleSubmit}
                    variant="contained"
                    color="primary">
                    Update Password
                </Button>
                <Button onClick={onCancel}
                    variant="contained">
                    Cancel
                </Button>
            </CardActions>
            {error && (
                <Box sx={{ p: 1.5 }}>
                    <span style={{ color: 'red' }}>{error}</span>
                </Box>
            )}
        </Card>
    );
};
