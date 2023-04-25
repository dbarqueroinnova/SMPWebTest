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
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const empyDetalleProducto = {
    detalleProductoId: 0,
    nombre: '',
    descripcion: '',
    orden: 0,
    estado: true,
};



export const View = (props) => {
    const { producto } = props;

    return (
        <Box>
            <Paper fullWidth elevation={0}>
                <Grid container>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="nombre" label="Nombre" variant="outlined" InputProps={{ readOnly: true }} value={producto?.nombre} />
                    </Grid>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="codigo" label="Código" variant="outlined" InputProps={{ readOnly: true }} value={producto?.codigo} />
                    </Grid>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="codigo" label="Convenio" variant="outlined" InputProps={{ readOnly: true }} value={producto?.convenio.nombre} />
                    </Grid>
                    <Grid item md={3} xs={12} sx={{ p: 1 }}>
                        <TextField fullWidth id="descripcion" label="Descripción" multiline rows={4} InputProps={{ readOnly: true }} value={producto?.descripcion} />
                    </Grid>
                </Grid>
            </Paper>
            <Divider sx={{ m: 2 }}>
                <Chip label="Ragos de edad" />
            </Divider>
            <Paper className='mv-40' elevation={0} sx={{ p: 1 }}>
                <Card variant="outlined" sx={{ mt: 1 }}>
                    <List fullWidth>
                        {producto.rangoEdad.map((rango, index) => {
                            return rango.estado == true && (<ListItem>
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
            <Paper className='mv-40' elevation={0} sx={{ p: 1 }}>
                <Card variant="outlined" sx={{ mt: 1 }}>
                    <List fullWidth>
                        {producto.detalleProducto.map((detalle, index) => {
                            return detalle.estado == true && (<ListItem>
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
        </Box>
    );
}