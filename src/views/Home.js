import { Container, Grid } from "@mui/material";
import React from "react";
import { InitalBox } from "../components/ResponsiveDrawer/InitialBox";
import Profile from "../components/ResponsiveDrawer/Profile";

export const Home = () => {
  return (
    <InitalBox>
      <Container component="main" maxWidth="md">
        <Grid
          container
          spacing={2}
          style={{
            alignItems: "center",
            marginTop: "90px",
            paddingBottom: "50px",
          }}
        >
          <div>
            <h1>Uniserse</h1>
            <p>Gestion de evidencias</p>
            <Profile />
          </div>
        </Grid>
      </Container>
    </InitalBox>
  );
};
