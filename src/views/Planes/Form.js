import * as React from 'react';
import cloneDeep from "lodash/cloneDeep";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import ListItemIcon from '@mui/material/ListItemIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { GrDrag } from "react-icons/gr";
import { Grid } from '@mui/material';

export const Form = (props) => {
    const { plan, productos, monedas, handlePlanInputChange, handlePlanDetalleInputChange, handleRangoEdadInputChange } = props;

    const InputLabelProps = (plan.planId === 0) ? null : { shrink: true };

    return (
        <Box>
            <Paper fullWidth elevation={0}>
                <Grid container>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <TextField fullWidth id="nombre" label="Nombre" variant="outlined" InputLabelProps={InputLabelProps} value={plan?.nombre} onChange={handlePlanInputChange} />
                        <FormControlLabel control={<Checkbox id="destacado" icon={<StarBorderIcon />} checkedIcon={<StarIcon />} checked={plan?.destacado} onChange={handlePlanInputChange} />} label="Destacar plan" />
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <TextField fullWidth id="producto" name='producto' select label="Producto" InputProps={{ readOnly: plan.planId > 0 }} defaultValue={plan?.producto.productoId} onChange={handlePlanInputChange}>
                            {productos.filter(p => p.estado == true).map((option) => (
                                <MenuItem key={option.productoId} value={option.productoId}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormControlLabel control={<Checkbox id="procesoManual" checked={plan?.procesoManual} onChange={handlePlanInputChange} />} label="Procesamiento manual" />
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <FormControl fullWidth InputProps={{ readOnly: true }}>
                            <InputLabel htmlFor="montoCubierto">Monto Cubierto</InputLabel>
                            <OutlinedInput
                                id="montoCubierto"
                                value={plan?.montoCubierto}
                                startAdornment={<InputAdornment position="start">{plan?.moneda.simbolo}</InputAdornment>}
                                label="Monto Cubierto"
                                onChange={handlePlanInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <TextField fullWidth id="Moneda" name='Moneda' select label="Moneda" defaultValue={plan?.moneda.monedaId} onChange={handlePlanInputChange}>
                            {monedas.filter(p => p.estado == true).map((option) => (
                                <MenuItem key={option.monedaId} value={option.monedaId}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
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
                                    <FormControl fullWidth InputProps={{ readOnly: true }}>
                                        <InputLabel htmlFor="montoCubierto">Monto Cubierto</InputLabel>
                                        <OutlinedInput
                                            id={`precioColegiadoMasculino-${detalle.rangoEdad.rangoEdadId}`}
                                            value={detalle?.precioColegiadoMasculino}
                                            startAdornment={<InputAdornment position="start">{plan?.moneda.simbolo}</InputAdornment>}
                                            label="Colegiado Masculino"
                                            onChange={handleRangoEdadInputChange}
                                        />
                                    </FormControl>
                                </ListItemText>
                                <ListItemText>
                                    <FormControl fullWidth InputProps={{ readOnly: true }}>
                                        <InputLabel htmlFor="montoCubierto">Monto Cubierto</InputLabel>
                                        <OutlinedInput
                                            id={`precioColegiadoFemenino-${detalle.rangoEdad.rangoEdadId}`}
                                            value={detalle?.precioColegiadoFemenino}
                                            startAdornment={<InputAdornment position="start">{plan?.moneda.simbolo}</InputAdornment>}
                                            label="Colegiado Femenino"
                                            onChange={handleRangoEdadInputChange}
                                        />
                                    </FormControl>
                                </ListItemText>
                                <ListItemText>
                                    <FormControl fullWidth InputProps={{ readOnly: true }}>
                                        <InputLabel htmlFor="montoCubierto">Monto Cubierto</InputLabel>
                                        <OutlinedInput
                                            id={`precioDependienteMasculino-${detalle.rangoEdad.rangoEdadId}`}
                                            value={detalle?.precioDependienteMasculino}
                                            startAdornment={<InputAdornment position="start">{plan?.moneda.simbolo}</InputAdornment>}
                                            label="Dependiente Masculino"
                                            onChange={handleRangoEdadInputChange}
                                        />
                                    </FormControl>
                                </ListItemText>
                                <ListItemText>
                                    <FormControl fullWidth InputProps={{ readOnly: true }}>
                                        <InputLabel htmlFor="montoCubierto">Monto Cubierto</InputLabel>
                                        <OutlinedInput
                                            id={`precioDependienteFemenino-${detalle.rangoEdad.rangoEdadId}`}
                                            value={detalle?.precioDependienteFemenino}
                                            startAdornment={<InputAdornment position="start">{plan?.moneda.simbolo}</InputAdornment>}
                                            label="Dependiente Femenino"
                                            onChange={handleRangoEdadInputChange}
                                        />
                                    </FormControl>
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
                <Card variant="outlined" sx={{ mt: 1 }} >
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
                                    <TextField fullWidth id={`valor-${detalle.detalleProducto.detalleProductoId}`} label="Valor" variant="outlined" InputLabelProps={InputLabelProps} value={detalle?.valor} onChange={handlePlanDetalleInputChange} />
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