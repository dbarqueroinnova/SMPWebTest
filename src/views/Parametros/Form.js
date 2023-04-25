import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress, Toolbar, Typography } from '@mui/material';
import formReducer from './formReducer';
import SwitchParametros from '../../components/Parametros/SwitchParametros';
import { updateParametros } from '../../services/parametros';
import { toast, ToastContainer } from "react-toastify";

export const Form = ({ parametros }) => {

    const [state, dispatch] = React.useReducer(formReducer, parametros);
    const [loading, setLoading] = React.useState(false);
    const [errors, dispatchError] = React.useReducer(formReducer, [])

    const handleTextChange = (e) => {
        dispatch({
            type: "HANDLE INPUT TEXT",
            field: e.target.name,
            payload: e.target.name === 'Contrasena' ? e.target.value.trim() : e.target.value,
        })

        dispatchError({
            type: "HANDLE INPUT TEXT ERROR",
            field: e.target.name,
            payload: e.target.name === 'Contrasena' ? e.target.value.trim() : e.target.value,
        })
    }

    const handleSwitchChange = (e) => {
        dispatch({
            type: "TOGGLE",
            field: e.target.name
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await updateParametros(state)
            if (response) {
                setLoading(false)
                toast.success('Parámetros actualizados correctamente');
            }
        } catch (error) {
            setLoading(false)
            toast.error("Error al actualizar los parámetros");
        }
    }

    return (
        <Box mt='10px' component='form' onSubmit={onSubmit}>
            <ToastContainer />
            <Paper elevation={0}>
                <Toolbar>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >Configuración general
                    </Typography>
                </Toolbar>
                <Grid container>
                    {parametros.map((item, key) => {
                        return (
                            item.estado === 'A' && item.nombre === 'TiempoExpiracionToken' &&
                            <React.Fragment key={key}>
                                {SwitchParametros({
                                    nombre: item.nombre,
                                    valor: state[key].valor,
                                    onChange: handleTextChange,
                                    onChangeSwitch: handleSwitchChange,
                                    errors: errors

                                })}
                            </React.Fragment>
                        )
                    })}
                </Grid>
                <Toolbar>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >Configuración de correo
                    </Typography>
                </Toolbar>
                <Grid container>
                    {parametros.map((item, key) => {
                        return (
                            item.estado === 'A' && item.nombre !== 'TiempoExpiracionToken' &&
                            <React.Fragment key={key}>
                                {SwitchParametros({
                                    nombre: item.nombre,
                                    valor: state[key].valor,
                                    onChange: handleTextChange,
                                    onChangeSwitch: handleSwitchChange,
                                    errors: errors
                                })}
                            </React.Fragment>
                        )
                    })}
                </Grid>
                <Grid container mt='20px' >
                    <Grid item sx={{ p: 1 }}>
                        <Button variant="contained">Probar Conexión</Button>
                    </Grid>
                    <Grid item sx={{ p: 1 }}>
                        {!loading ?
                            <Button variant="contained" color="success" type='submit' disabled={errors.length !== 0 ? true : false}>Guardar</Button>
                            :
                            <>
                                <CircularProgress sx={{ ml: 3 }} />
                            </>
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    );
}