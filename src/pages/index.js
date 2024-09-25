import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewLatestOrders } from "src/sections/overview/prediction-history";
import { ImportData } from "src/sections/overview/import-data";
import { PredictionAnalysis } from "src/sections/overview/prediction-analysis";
import { PredictionResult } from "src/sections/overview/prediction-result";
import { InputForm } from "src/sections/overview/input-data";

const now = new Date();

const Page = () => {
  const [GradeCounts, setGradeCounts] = useState([]);
  const [LowPred, setLowPred] = useState(0);
  const [MedPred, setMedPred] = useState(0);
  const [HighPred, setHighPred] = useState(0);
  const [TotalCount, setTotalCount] = useState(0);
  const [predictionResults, setPredictionResults] = useState({
    prediction: null,
    accuracy: null,
    suggestions: null,
  });
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [token, setToken] = useState(""); // State to store the token

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-predictions");
        setGradeCounts(response.data.grade_count);
        const lowCount = response.data.grade_count[0]?.Count || 0;
        const medCount = response.data.grade_count[1]?.Count || 0;
        const highCount = response.data.grade_count[2]?.Count || 0;
        const totalCount = lowCount + medCount + highCount;
        setLowPred(lowCount);
        setMedPred(medCount);
        setHighPred(highCount);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchPredictions();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token not found in session storage.");
    }
  }, [fetchTrigger]);

  const handleInputFormSubmit = (formData) => {
    axios
      .post(`http://localhost:5000/predict?token=${token}`, formData)
      .then((response) => {
        setPredictionResults({
          prediction: response.data.prediction,
          accuracy: response.data.accuracy,
          suggestions: response.data.suggestions,
        });
        setFetchTrigger((prev) => !prev); // Toggle fetch trigger
      })
      .catch((error) => {
        console.error("Error predicting with Ensemble model:", error);
      });
  };

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <PredictionAnalysis
                chartSeries={([Math.floor((LowPred / TotalCount) * 100), Math.floor((MedPred / TotalCount) * 100), Math.ceil((HighPred / TotalCount) * 100)])}
                labels={["Low", "Medium", "High"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <InputForm onSubmit={handleInputFormSubmit} />
              <PredictionResult
                prediction={predictionResults.prediction}
                accuracy={predictionResults.accuracy}
                suggestions={predictionResults.suggestions}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                fetchTrigger={fetchTrigger} // Pass fetch trigger as prop
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item xs={6} md={12} lg={4}>
              <ImportData
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
