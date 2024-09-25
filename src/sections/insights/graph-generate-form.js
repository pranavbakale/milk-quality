import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    MenuItem,
    FormControl,
    TextField,
    Typography,
    Tooltip,
    IconButton,
    SvgIcon,
} from "@mui/material";
import axios from "axios";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import EmailIcon from "@mui/icons-material/Email";

export const GenerateGraphForm = () => {
    const [selectedAttribute, setSelectedAttribute] = useState("");
    const [graphData, setGraphData] = useState([]);
    const [isExportEnabled, setIsExportEnabled] = useState(false);

    const attributes = [
        "pH",
        "Temperature",
        "Taste",
        "Odor",
        "Fat",
        "Turbidity",
        "Colour",
        "Grade",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/generate-graphs", {
                attribute: selectedAttribute,
            });
            const graphUrls = response.data;
            setGraphData([
                { name: `${selectedAttribute} Line Plot`, url: graphUrls.linePlotUrl },
                {
                    name: `Distribution Plot of ${selectedAttribute}`,
                    url: graphUrls.histogramUrl,
                },
                { name: `${selectedAttribute} Count Plot`, url: graphUrls.boxPlotUrl },
                {
                    name: `Count Plot of ${selectedAttribute}`,
                    url: graphUrls.countPlotUrl,
                },
                { name: "Heatmap", url: graphUrls.heatmapUrl },
            ]);
            setIsExportEnabled(true); // Enable export button after generating graphs
        } catch (error) {
            console.error("Error generating graphs:", error);
        }
    };

    const handleExport = async () => {
        try {
            // Make a GET request to the backend endpoint to trigger PDF generation
            const response = await axios.get(`http://localhost:5000/generate-graphs-pdf?attribute=${selectedAttribute}`, {
                responseType: 'blob', // Set response type to blob to handle binary data
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);

            // Create a link element to initiate the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'generated_graphs.pdf'); // Set the filename for the downloaded file
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Remove the link element
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting PDF:", error);
        }
    };

    const handleEmail = async () => {
        const token = localStorage.getItem('token');
        try {
            // Make a POST request to the backend endpoint to send the PDF file via email
            await axios.post(`http://localhost:5000/send-graphs-pdf-email`, {
                token: token, // Pass the user's email
                attribute: selectedAttribute,
            });

            // Show a success message to the user
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <Card>
            <CardHeader title="Generate Graphs" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <TextField
                            select
                            name="Attribute"
                            id="attribute-label"
                            label="Attribute"
                            labelId="attribute-label"
                            value={selectedAttribute}
                            onChange={(e) => setSelectedAttribute(e.target.value)}
                        >
                            {attributes.map((attribute) => (
                                <MenuItem key={attribute} value={attribute}>
                                    {attribute}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Generate Graphs
                        </Button>
                        {isExportEnabled && (
                            <div>
                                <Tooltip title="Download">
                                    <IconButton onClick={handleExport}>
                                        <GetAppRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Email Me">
                                    <IconButton onClick={handleEmail}>
                                        <EmailIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </form>
                {graphData.length > 0 && (
                    <div>
                        <Typography variant="h6" sx={{ mt: 4 }}>
                            Generated Graphs:
                        </Typography>
                        {graphData.map((graph, index) => (
                            <div key={index} style={{ marginBottom: "20px" }}>
                                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                    {graph.name}
                                </Typography>
                                <img
                                    src={"http://localhost:5000/graphs/" + graph.url + `?${Math.random()}`}
                                    alt={graph.name}
                                    style={{ maxWidth: "100%", marginTop: "10px" }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
