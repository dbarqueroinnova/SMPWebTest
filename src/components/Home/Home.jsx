import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InitalBox } from '../ResponsiveDrawer/InitialBox';
import PrincipalContainer from './PrincipalContainer';

const mainFeaturedPost = {
  title: 'Bienvenido al sistema Back Office Protégeme CFIA Uniserse',
  description:
    "Elige una opción para empezar a usar la aplicación",
  imageText: "Fondo BackOffice"
};


const theme = createTheme();


export default function Home() {
  return (

    <Grid mt="30px">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <PrincipalContainer post={mainFeaturedPost} />
          </main>
        </Container>
      </ThemeProvider>
    </Grid>

  );
}