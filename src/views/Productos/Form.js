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
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { MdAddBox } from "react-icons/md";
import { GrDrag } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { Toast } from "../../components/toast";
import { toast } from "react-toastify";



const empyDetalleProducto = {
    detalleProductoId: 0,
    nombre: '',
    descripcion: '',
    orden: 0,
    estado: true,
};
const empyRangoEdad = {
    rangoEdadId: 0,
    edadInicial: 0,
    edadFinal: 0,
    estado: true,
};


export const Form = (props) => {
    const { producto, handleProductoInputChange, handleAddDetalle, handleRemoveDetalle,handleAddRango,handleRemoveRango, convenios } = props;

    const [detalleProducto, setDetalleProducto] = React.useState(empyDetalleProducto);
    const [rangoEdad, setRangoEdad] = React.useState(empyRangoEdad);

    const InputLabelProps = (producto.productoId === 0) ? null : { shrink: true };

    const handleDetalleProductoInputChange = (event) => {
        const tmpdetalleProducto = cloneDeep(detalleProducto);
        tmpdetalleProducto[event.target.id] = event.target.value;
        setDetalleProducto(tmpdetalleProducto)
    }

    const addDetalle = () => {
        handleAddDetalle(detalleProducto)
        setDetalleProducto(empyDetalleProducto)
    }

    const removeDetalle = (index) => {
        handleRemoveDetalle(index)
    }

    const handleRangoEdadInputChange = (event) => {
           let value = parseInt(event.target.value)
           if(Number.isInteger(value)){
                const tmpRangoEdad = cloneDeep(rangoEdad);
                tmpRangoEdad[event.target.id] = value;
                setRangoEdad(tmpRangoEdad)
           }
           else{
                const tmpRangoEdad = cloneDeep(rangoEdad);
                tmpRangoEdad[event.target.id] = 0;
                setRangoEdad(tmpRangoEdad)
           }
            
    }

    const addRango = () => {

        if(rangoEdad.edadInicial >= rangoEdad.edadFinal ){
            toast.error("La edad inicial debe ser menor a la edad final");
            return false;
        } 
        if(rangoEdad.edadFinal <= rangoEdad.edadInicial ){
            toast.error("La edad final debe ser mayor a la edad inicial");
            return false;
        } 

        handleAddRango(rangoEdad)
        setRangoEdad(empyRangoEdad)
    }

    const removeRango = (index) => {
        handleRemoveRango(index)
    }

    return (
        <Box>
            <Paper fullWidth elevation={0}>
                <Grid container>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="nombre" label="Nombre" variant="outlined" InputLabelProps={InputLabelProps} value={producto?.nombre} onChange={handleProductoInputChange} />
                    </Grid>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="codigo" label="Código" variant="outlined" InputLabelProps={InputLabelProps} value={producto?.codigo} onChange={handleProductoInputChange} />
                    </Grid>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="convenio" name='convenio' select label="Convenio" defaultValue={producto?.convenio.convenioId} onChange={handleProductoInputChange}>
                            {convenios.map((option) => (
                                <MenuItem key={option.convenioId} value={option.convenioId}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="descripcion" label="Descripción" multiline rows={4} InputLabelProps={InputLabelProps} value={producto?.descripcion} onChange={handleProductoInputChange} />
                    </Grid>
                </Grid>
            </Paper>
            <Divider sx={{ m: 2 }}>
                <Chip label="Rangos de Edad" />
            </Divider>
            <Paper className='form-control-group' elevation={0} sx={{ display: 'flex', p: 1, '& .MuiTextField-root': { mr: 1 } }}>
                <Grid container>
                    <Grid item md={6} xs={12} sx={{ p: 1 }}>
                        <TextField
                            fullWidth
                            id="edadInicial"
                            label="De"
                            value={rangoEdad.edadInicial}
                            variant="outlined"
                            InputLabelProps={InputLabelProps}
                            onChange={handleRangoEdadInputChange} />
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ p: 1 }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="Hasta">Hasta</InputLabel>
                            <OutlinedInput
                                id={"edadFinal"}
                                value={rangoEdad.edadFinal}
                                endAdornment={
                                    <IconButton edge="end" onClick={() => addRango()}>
                                        <MdAddBox />
                                    </IconButton>
                                }
                                onChange={handleRangoEdadInputChange}
                                label="Hasta"
                            />
                        </FormControl>
                    </Grid>
                </Grid>


            </Paper>
            <Paper className='mv-40' elevation={0} sx={{ p: 1 }}>
                <Card variant="outlined" sx={{ mt: 1 }}>
                    <List fullWidth>
                        {producto.rangoEdad.map((rango, index) => {
                            return rango.estado == true && (<ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => removeRango(index)}>
                                        <MdDeleteOutline />
                                    </IconButton>
                                }>
                                <ListItemIcon>
                                    <GrDrag />
                                </ListItemIcon>
                                <ListItemText>
                                    <Card fullWidth elevation={0}>
                                        <Typography component="div">
                                            de {rango.edadInicial} a {rango.edadFinal}
                                        </Typography>
                                    </Card>
                                </ListItemText>

                                <Divider component="li" />
                            </ListItem>)
                        }

                        )}
                    </List>
                </Card>
            </Paper>
            <Divider sx={{ m: 2 }}>
                <Chip label="Detalles del producto" />
            </Divider>
            <Paper className='form-control-group' elevation={0} sx={{ display: 'flex', p: 1, '& .MuiTextField-root': { mr: 1 } }}>
                <Grid container>
                    <Grid item md={6} xs={12} sx={{ p: 1 }}>
                        <TextField
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            value={detalleProducto.nombre}
                            variant="outlined"
                            InputLabelProps={InputLabelProps}
                            onChange={handleDetalleProductoInputChange} />
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ p: 1 }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                            <OutlinedInput
                                id={"descripcion"}
                                value={detalleProducto.descripcion}
                                endAdornment={
                                    <IconButton edge="end" onClick={() => addDetalle()}>
                                        <MdAddBox />
                                    </IconButton>
                                }
                                onChange={handleDetalleProductoInputChange}
                                label="Descripcion"
                            />
                        </FormControl>
                    </Grid>
                </Grid>


            </Paper>
            <Paper className='mv-40' elevation={0} sx={{ p: 1 }}>
                <Card variant="outlined" sx={{ mt: 1 }}>
                    <List fullWidth>
                        {producto.detalleProducto.map((detalle, index) => {
                            return detalle.estado == true && (<ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => removeDetalle(index)}>
                                        <MdDeleteOutline />
                                    </IconButton>
                                }>
                                <ListItemIcon>
                                    <GrDrag />
                                </ListItemIcon>
                                <ListItemText>
                                    <Card fullWidth elevation={0}>
                                        <Typography component="div">
                                            {detalle.nombre}
                                        </Typography>
                                        <Typography variant="p" color="text.secondary">
                                            {detalle.descripcion}
                                        </Typography>
                                    </Card>
                                </ListItemText>

                                <Divider component="li" />
                            </ListItem>)
                        }

                        )}
                    </List>
                </Card>
            </Paper>
            <Toast />
        </Box>
    );
}