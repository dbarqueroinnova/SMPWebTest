import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React, { useEffect } from "react";

const theme = createTheme();
export const CustomComponentForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label>{props.item.forms.title}</label>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {props.item.forms.items.map((form, key) => {
              if (
                form.type === "text" ||
                form.type === "number" ||
                form.type === "password"
              ) {
                return (
                  <React.Fragment key={key}>
                    <TextField
                      error={false}
                      margin="normal"
                      required={form.required}
                      fullWidth
                      id={key}
                      label={form.label}
                      name={form.name}
                      type={form.type}
                    />
                  </React.Fragment>
                );
              } else if (form.type === "switch") {
                return (
                  <>
                    <FormControlLabel
                      labelPlacement="start"
                      name={form.name}
                      control={<Switch defaultChecked />}
                      label={form.label}
                    />
                  </>
                );
              }
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
