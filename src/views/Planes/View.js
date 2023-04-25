import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import ListItemIcon from '@mui/material/ListItemIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { GrDrag } from "react-icons/gr";
import { Grid } from '@mui/material';

export const View = (props) => {
    const { plan, productos, handlePlanInputChange, handlePlanDetalleInputChange } = props;

    const InputLabelProps = (plan.planId === 0) ? null : { shrink: true };

    return (
        <Box>
            <Paper fullWidth elevation={0}>
                <Grid container>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <TextField fullWidth id="nombre" label="Nombre" variant="outlined" InputProps={{ readOnly: true }} value={plan?.nombre} />
                        <FormControlLabel control={<Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} InputProps={{ readOnly: true }} checked={plan?.destacado} />} label="Destacar plan" />
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <TextField fullWidth id="producto" label="Producto" variant="outlined" InputProps={{ readOnly: true }} value={plan?.producto.nombre} />
                        <FormControlLabel control={<Checkbox InputProps={{ readOnly: true }} checked={plan?.procesoManual} />} label="Procesamiento manual" />
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <FormControl fullWidth  InputProps={{ readOnly: true }}>
                            <InputLabel htmlFor="montoCubierto">Monto Cubierto</InputLabel>
                            <OutlinedInput
                                id="montoCubierto"
                                 value={plan?.montoCubierto}
                                startAdornment={<InputAdornment position="start">{plan?.moneda.simbolo}</InputAdornment>}
                                label="Monto Cubierto"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <TextField fullWidth id="moneda" label="moneda" variant="outlined" InputProps={{ readOnly: true }} value={plan?.moneda.nombre} />
                    </Grid>
                </Grid>
            </Paper>
            <Divider sx={{ m: 2 }}>
                <Chip label="Precios por rango de edad" />
            </Divider>
            <Paper className='mv-40' elevation={0} sx={{ p: 1 }}>
                <Card variant="outlined" sx={{ mt: 1 }} >
                    <List fullWidth>
                        {plan.precioRangoEdad.map((detalle, index) => {
                            return detalle.estado == true && (<ListItem>
                                <ListItemIcon>
                                    <GrDrag />
                                </ListItemIcon>
                                <ListItemText>
                                    <Card fullWidth elevation={0}>
                                        <Typography component="div">
                                            de {detalle.rangoEdad.edadInicial} a {detalle.rangoEdad.edadFinal}
                                        </Typography>
                                    </Card>
                                </ListItemText>
                                <ListItemText>
                                    {plan?.moneda.simbolo} {detalle?.precioColegiadoMasculino}
                                </ListItemText>
                                <ListItemText>
                                    {plan?.moneda.simbolo} {detalle?.precioColegiadoFemenino}
                                </ListItemText>
                                <ListItemText>
                                    {plan?.moneda.simbolo} {detalle?.precioDependienteMasculino}
                                </ListItemText>
                                <ListItemText>
                                    {plan?.moneda.simbolo} {detalle?.precioDependienteFemenino}
                                </ListItemText>

                                <Divider component="li" />
                            </ListItem>)
                        }

                        )}
                    </List>
                </Card>
            </Paper>
            <Divider sx={{ m: 2 }}>
                <Chip label="Detalles del plan" />
            </Divider>
            <Paper className='mv-40' elevation={0} sx={{ p: 1 }}>
                <Card variant="outlined" sx={{ mt: 1 }}>
                    <List fullWidth>
                        {plan.planDetalleProducto.map((detalle, index) => {
                            return detalle.estado == true && (<ListItem>
                                <ListItemIcon>
                                    <GrDrag />
                                </ListItemIcon>
                                <ListItemText>
                                    <Card fullWidth elevation={0}>
                                        <Typography component="div">
                                            {detalle.detalleProducto.nombre}
                                        </Typography>
                                        <Typography variant="p" color="text.secondary">
                                            {detalle.detalleProducto.descripcion}
                                        </Typography>
                                    </Card>
                                </ListItemText>
                                <ListItemText>
                                    {detalle?.valor}
                                </ListItemText>

                                <Divider component="li" />
                            </ListItem>)
                        }

                        )}
                    </List>
                </Card>
            </Paper>
        </Box>
    );
}