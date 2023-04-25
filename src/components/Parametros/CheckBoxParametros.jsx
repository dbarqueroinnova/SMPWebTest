import { Checkbox, FormControlLabel, Grid } from "@mui/material";

function CheckboxParametros({ name, value, onChangeSwitch }) {
    return (
        <Grid item md={4} xs={12} sx={{ p: 1 }}>
            <FormControlLabel
                control={<Checkbox checked={value === 'True' ? true : false} />}
                label={name}
                name={name}
                onChange={onChangeSwitch}
            />
        </Grid>
    )
}

export default CheckboxParametros