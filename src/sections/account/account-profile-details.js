import { useCallback, useState, useEffect, use } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PasswordUpdateForm } from './PasswordUpdateForm'; // Import the new component

import axios from "axios";

const states = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' },
  { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
  { value: 'Chandigarh', label: 'Chandigarh' },
  { value: 'Dadra and Nagar Haveli', label: 'Dadra and Nagar Haveli' },
  { value: 'Daman and Diu', label: 'Daman and Diu' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'Puducherry', label: 'Puducherry' },
];

const DisabledTextField = styled(TextField)({
  '& input': {
    opacity: 1, // Adjust the opacity to maintain visibility
  },
});

export const AccountProfileDetails = ({ user, updateUserProfile }) => {
  // console.log("in account profile details component with user data: ", user);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: ''
  });

  const [selectedState, setSelectedState] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update values state when the user prop changes
  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        state: user.state || ''
      });
      setSelectedState(user.state || '');
    }
  }, [user]);


  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const handleStateChange = useCallback((event) => {
    setSelectedState(event.target.value); // Update the selected state
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.put(
          `http://localhost:5000/update-user-details?token=${token}`, // Include token as a query parameter
          { ...values, state: selectedState }
        );
        console.log(response.data);

        updateUserProfile({ ...values, state: selectedState });

      } catch (error) {
        console.error('Error updating user details:', error);
      }
    },
    [values, selectedState, updateUserProfile]
  );

  const handlePasswordUpdateClick = useCallback(() => {
    setShowPasswordForm(true);
  }, []);

  const handlePasswordUpdate = useCallback(() => {
    // Handle password update logic...
    // Display success message...
    setSuccessMessage('Password updated successfully.');
    // Redirect to /account
    setTimeout(() => {
      window.location.href = '/account';
    }, 3000); // Redirect after 3 seconds
  }, []);


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title="PROFILE"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                {/* <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}

                /> */}
                <DisabledTextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleStateChange}
                  select
                  SelectProps={{ native: true }}
                  // value={user && user.state && states.find(state => state.value === user.state) ? user.state : ''}
                  value={selectedState}
                >
                  <option value=""></option>
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                {/* <CardActions>
                  <Button
                    fullWidth
                    variant="text"
                  >
                    Update Password
                  </Button>
                </CardActions> */}
                {showPasswordForm && (
                  <PasswordUpdateForm
                    onSuccess={handlePasswordUpdate}
                    onCancel={() => setShowPasswordForm(false)}
                  />
                )}
                <CardActions>
                  <Button
                    fullWidth
                    variant="text"
                    onClick={handlePasswordUpdateClick}>
                    Update Password
                  </Button>
                </CardActions>
                {/* Success message */}
                {successMessage && (
                  <Typography variant="body1"
                    color="success">
                    {successMessage}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit"
            variant="contained">
            Save Details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};