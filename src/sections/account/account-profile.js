import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  height: 80,
  width: 80,
  marginBottom: theme.spacing(2)
}));

export const AccountProfile = ({ user, updateUserAvatar }) => {
  console.log('user data in avatar', user);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleUploadAvatar = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const response = await axios.post(`http://localhost:5000/upload-avatar?token=${user.token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      updateUserAvatar(response.data.avatar);
    } catch (error) {
      console.error('Error uploading avatar', error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardContent>
        {user ? (
          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <CustomAvatar
              alt="avatar"
              src={avatar ? URL.createObjectURL(avatar) : `http://localhost:5000/uploads/avatars/${user.avatar}`}

            /> {/* Check if user.avatar exists */}
            <Typography gutterBottom
              variant="h5">
              {user.name ? user.name : 'Name'}
            </Typography>
            <Typography color="text.secondary"
              variant="body2">
              {user.state}, {user.country}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">Loading user data...</Typography>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-upload">
            <Button
              component="span"
              fullWidth
              variant="text"
              disabled={loading}
              startIcon={<CloudUpload />}
            >
              Upload Picture
            </Button>
          </label>
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          onClick={handleUploadAvatar}
          disabled={!avatar || loading}
          sx={{ width: '180px', height: '50px', borderRadius: '10px' }}
        >
          Save Avatar
        </Button>
      </CardActions>
    </Card>
  );
};
