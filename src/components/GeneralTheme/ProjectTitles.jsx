import { Grid } from "@mui/material"
import React from "react"
import { colorsProject } from "../../css/colorsProject"

export default function ProjectTitles({title}) {
    return (
        <Grid item>
            <h1 style={{ color: colorsProject['azul- uniserse'] }}>{title}</h1>
        </Grid>
    )

}