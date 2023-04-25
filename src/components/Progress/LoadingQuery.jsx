import { CircularProgress, Grid } from "@mui/material"
import React from "react"
import { colorsProject } from "../../css/colorsProject"

function LoadingQuery() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress sx={{ mt: '30px', color: `${colorsProject['azul- uniserse']}` }} />
        </Grid>
    )
}

export default LoadingQuery