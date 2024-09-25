import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import {Grid, Typography, TableRow, TableCell, TableContainer, TableHead, Table, TableBody, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { GenerateGraphForm } from '/src/sections/insights/graph-generate-form';
import { flexbox } from "@mui/system";


export const InsightPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    fetchPredictions();
  }, [currentPage]);

  const fetchPredictions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-predictions");
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderPaginationControls = () => {
    return (
      <div>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={(currentPage - 1) * pageSize + pageSize >= predictions.length}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    );
  };

  const renderPredictions = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPagePredictions = predictions.slice(startIndex, endIndex);

    return (
      <TableBody>
      {currentPagePredictions.map((prediction, index) => (
        <TableRow key={index}>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.date}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.time}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.pH}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Temperature}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Taste === 1 ? 'Good' : 'Bad'}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Odor === 1 ? 'Good' : 'Bad'}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Fat === 1 ? 'High' : 'Low'}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Turbidity === 1 ? 'High' : 'Low'}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Colour}</TableCell>
          <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>{prediction.Grade}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    );
  };

  const totalCount = predictions.length;

  return (
    <div>
      <Head>
        <title>Insight Page</title>
      </Head>
      <h1>Recent Predictions</h1>
      <div style={{ height: 600 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Date</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Time</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >pH</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Temperature</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Taste</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Odor</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Fat</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Turbidity</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Colour</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }} >Grade</TableCell>
              </TableRow>
            </TableHead>
            {renderPredictions()}
          </Table>
        </TableContainer>
        <Grid style={{ display: 'flex', flex:'end'}}>
          <h4>Total {totalCount}</h4>
        </Grid>
        {renderPaginationControls()}
      </div>
      <GenerateGraphForm />
    </div>
  );
};
