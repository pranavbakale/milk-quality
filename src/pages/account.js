import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout, updateUserAvatar } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';

import axios from 'axios';
import { useRouter } from 'next/router';

const Page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token not found in localStorage");
        router.push('/auth/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/user-details?token=${token}`);
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
        router.push('/auth/login');
      }
    };

    fetchUserDetails();
  }, []);

  const updateUserProfile = (updatedProfile) => {
    setUser(updatedProfile);
  };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container
                spacing={3}>
                <Grid item
                  xs={12}
                  md={6}
                  lg={4}>
                  <AccountProfile user={user}
                    updateUserAvatar={updateUserAvatar} />
                </Grid>
                <Grid item
                  xs={12}
                  md={6}
                  lg={8}>
                  <AccountProfileDetails user={user}
                    updateUserProfile={updateUserProfile} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
