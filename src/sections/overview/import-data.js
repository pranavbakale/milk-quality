import PropTypes from 'prop-types';
import { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/system';
import { Card, CardHeader, CardContent, Button, Stack, Typography } from '@mui/material';

const CustomButton = styled(Button)({
  backgroundColor: '#4caf50', // Green color
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049', // Darker green color on hover
  },
});

const StyledCard = styled(Card)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  gap: '20px',
  margin: 'auto', // Center the card horizontally
  backgroundColor: 'rgb(255,255,255)', // Light blue background color
  backgroundColor: 'rgb(255,255,255)', // Light blue background color
  borderRadius: '15px', // Rounded corners
});

export const ImportData = (props) => {
  const { difference, positive = false, sx, value } = props;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const csvFiles = Array.from(files).filter(file => file.name.endsWith('.csv'));
    setSelectedFiles(csvFiles);
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('file', file);
      });
      const token = localStorage.getItem('token');

      fetch(`http://localhost:5000/upload-csv?token=${token}`, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log('CSV files uploaded successfully');
          // Optionally, you can reset the selectedFiles state here
          setSelectedFiles([]);
        } else {
          console.error('Failed to upload CSV files');
        }
      })
      .catch(error => {
        console.error('Error uploading CSV files:', error);
      });
    } else {
      console.error('No files selected');
    }
  };

  return (
    <StyledCard>
      <CardHeader title="Import Data" />
      <CardContent>
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="center"
          spacing={2}
        >
          <Stack spacing={1}>
            <input
              type="file"
              id="fileInput"
              accept=".csv"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple // Allow multiple file selection
            />
            <label htmlFor="fileInput">
              <CustomButton
                variant="contained"
                color="primary"
                component="span"
                startIcon={<FileUploadIcon />}
              >
                Upload CSV Files
              </CustomButton>
            </label>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#2196f3', color: 'white', fontSize: '16px' }} // Increased font size
              onClick={handleUploadClick}
            >
              Upload
            </Button>
          </Stack>
          {selectedFiles.length > 0 && (
            <Typography variant="body2"
                        color="text.secondary">
              Selected Files: {selectedFiles.map(file => file.name).join(', ')}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

ImportData.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};