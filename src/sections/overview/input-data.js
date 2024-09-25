import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export const InputForm = ({ onSubmit }) => {
  const colorBoxes = [];
  for (let i = 240; i <= 255; i++) {
    const color = `rgb(${i},${i},${i})`;
    colorBoxes.push({ value: i, color: color });
  }

  const [formData, setFormData] = useState({
    pH: "",
    Temperature: "",
    Taste: "",
    Odor: "",
    Fat: "",
    Turbidity: "",
    Colour: "",
  });
  const [errors, setErrors] = useState({
    pH: "",
    Temperature: "",
    Taste: "",
    Odor: "",
    Fat: "",
    Turbidity: "",
    Colour: "",
  });
  const [touchedFields, setTouchedFields] = useState({});

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "pH":
        if (value === "" || parseFloat(value) < 3 || parseFloat(value) > 9.5) {
          errorMessage = "pH should be between 3 to 9.5";
        }
        break;
      case "Temperature":
        if (value === "" || parseFloat(value) < 34 || parseFloat(value) > 90) {
          errorMessage = "Temperature should be between 34°C to 90°C";
        }
        break;
      case "Taste":
      case "Odor":
        if (!["good", "bad"].includes(value.toLowerCase())) {
          errorMessage = `${fieldName} should be either 'good' or 'bad'`;
        }
        break;
      case "Fat":
      case "Turbidity":
        if (!["low", "high"].includes(value.toLowerCase())) {
          errorMessage = `${fieldName} should be either 'low' or 'high'`;
        }
        break;
      case "Colour":
        if (value === "" || parseInt(value) < 240 || parseInt(value) > 255) {
          errorMessage = "Colour should be an integer between 240 to 255";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleBlur = (fieldName) => {
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const fieldErrorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newTouchedFields = {};

    Object.keys(formData).forEach((fieldName) => {
      if (formData[fieldName] === "") {
        isValid = false;
      } else {
        const fieldErrorMessage = validateField(fieldName, formData[fieldName]);
        if (fieldErrorMessage !== "") {
          isValid = false;
          newTouchedFields[fieldName] = true;
        }
      }
    });

    setTouchedFields(newTouchedFields);

    if (isValid) {
      const convertedFormData = {
        ...formData,
        Taste: formData.Taste.toLowerCase() === "good" ? 1 : 0,
        Odor: formData.Odor.toLowerCase() === "good" ? 1 : 0,
        Fat: formData.Fat.toLowerCase() === "high" ? 1 : 0,
        Turbidity: formData.Turbidity.toLowerCase() === "high" ? 1 : 0,
      };
      onSubmit(convertedFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="pH"
          name="pH"
          value={formData.pH}
          onChange={handleChange}
          onBlur={() => handleBlur("pH")}
          error={touchedFields.pH && errors.pH !== ""}
          helperText={touchedFields.pH && errors.pH}
          required
        />
        <TextField
          fullWidth
          label="Temperature (°C)"
          name="Temperature"
          value={formData.Temperature}
          onChange={handleChange}
          onBlur={() => handleBlur("Temperature")}
          error={touchedFields.Temperature && errors.Temperature !== ""}
          helperText={touchedFields.Temperature && errors.Temperature}
          required
        />
        <TextField
          fullWidth
          select
          label="Taste"
          name="Taste"
          value={formData.Taste}
          onChange={handleChange}
          onBlur={() => handleBlur("Taste")}
          error={touchedFields.Taste && errors.Taste !== ""}
          helperText={touchedFields.Taste && errors.Taste}
          required
        >
          <MenuItem value="good">Good</MenuItem>
          <MenuItem value="bad">Bad</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label="Odor"
          name="Odor"
          value={formData.Odor}
          onChange={handleChange}
          onBlur={() => handleBlur("Odor")}
          error={touchedFields.Odor && errors.Odor !== ""}
          helperText={touchedFields.Odor && errors.Odor}
          required
        >
          <MenuItem value="good">Good</MenuItem>
          <MenuItem value="bad">Bad</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label="Fat"
          name="Fat"
          value={formData.Fat}
          onChange={handleChange}
          onBlur={() => handleBlur("Fat")}
          error={touchedFields.Fat && errors.Fat !== ""}
          helperText={touchedFields.Fat && errors.Fat}
          required
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label="Turbidity"
          name="Turbidity"
          value={formData.Turbidity}
          onChange={handleChange}
          onBlur={() => handleBlur("Turbidity")}
          error={touchedFields.Turbidity && errors.Turbidity !== ""}
          helperText={touchedFields.Turbidity && errors.Turbidity}
          required
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>
        <FormControl fullWidth required error={touchedFields.Colour && errors.Colour !== ""}>
          <TextField
            fullWidth
            select
            label="Colour"
            name="Colour"
            value={formData.Colour}
            onChange={handleChange}
            onBlur={() => handleBlur("Colour")}
          >
            {colorBoxes.map((box) => (
              <MenuItem key={box.value} value={box.value}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography style={{ minWidth: "40px" }}>{box.value}</Typography>
                  </Grid>
                  <Grid item>
                    <Box bgcolor={box.color} width={200} height={40} border="1px solid #ccc" />
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </TextField>
          {touchedFields.Colour && errors.Colour !== "" && (
            <Typography variant="caption" color="error">
              {errors.Colour}
            </Typography>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

InputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
