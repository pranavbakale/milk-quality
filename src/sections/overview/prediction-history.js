import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

export const OverviewLatestOrders = (props) => {
  const { sx, fetchTrigger } = props;
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/last-six-months-data?token=${token}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [fetchTrigger]); // Fetch files each time fetchTrigger changes

  const downloadFile = async (fileName, filePath) => {
    axios.get(`http://localhost:5000/download-csv/${filePath}`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Prediction History" />
      <Box sx={{ minWidth: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => downloadFile(file.file_name, file.file_path)}
                  // Change href to onClick
                  >
                    <GetAppRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

OverviewLatestOrders.propTypes = {
  sx: PropTypes.object,
  fetchTrigger: PropTypes.bool, // Add fetchTrigger prop
};
