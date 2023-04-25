import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import LoadingQuery from "../components/Progress/LoadingQuery";
import { ToastErrorDatabase } from "../components/Progress/ToastErrorDatabase";
import { InitalBox } from "../components/ResponsiveDrawer/InitialBox";
import { getParametros } from "../services/parametros";
import { Form } from "../views/Parametros/Form";

function Parametros() {

    const { data, isLoading, error } = useQuery({
        queryKey: ["getParametros"],
        queryFn: () => getParametros(),
    });

    if (isLoading) return <LoadingQuery />;

    if (error) return <ToastErrorDatabase />;

    return (
        <Container component="main" maxWidth="100%">
            <Box mt="25px">
                <Grid container justifyContent='center'>
                    <Toolbar>
                        <Typography
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >Parámetros generales
                        </Typography>
                    </Toolbar>
                </Grid>
                <Form parametros={data} />
            </Box>
        </Container>
    )
}

export default Parametros