import CheckboxParametros from "./CheckBoxParametros";
import TextFieldParametros from "./TextFieldParametros";
import TextFieldPasswordParametros from "./TextFieldPasswordParametros";
import * as React from 'react'
import { Grid } from "@mui/material";

function SwitchParametros({ nombre, valor, onChange, onChangeSwitch, errors }) {
    switch (nombre) {
        case 'Servidor':
            return (
                <Grid item md={4} xs={12} sx={{ p: 1 }}>
                    <TextFieldParametros
                        name={nombre}
                        value={valor}
                        type="text"
                        onChange={onChange}
                        inputProps={{ maxLength: 50 }}
                        errors={errors}
                    />
                </Grid>
            );
        case 'Puerto':
            return (
                <Grid item md={4} xs={12} sx={{ p: 1 }}>
                    <TextFieldParametros
                        name={nombre}
                        value={valor}
                        type="number"
                        onChange={onChange}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                        }}
                        errors={errors}
                    />
                </Grid>
            );
        case 'Correo':
            return (
                <Grid item md={4} xs={12} sx={{ p: 1 }}>
                    <TextFieldParametros
                        name={nombre}
                        value={valor}
                        type="email"
                        onChange={onChange}
                        errors={errors}
                    />
                </Grid>
            );
        case 'Contrasena':
            return (
                <TextFieldPasswordParametros name={nombre} value={valor} onChange={onChange} />
            )
        case 'SSL':
            return (
                <Grid item md={4} xs={12} sx={{ p: 1 }}>
                    <CheckboxParametros name={nombre} value={valor} onChangeSwitch={onChangeSwitch} />
                </Grid>
            );
        case 'TiempoExpiracionToken':
            return (
                <Grid item md={4} sx={{ p: 1 }}>
                    <TextFieldParametros
                        name={nombre}
                        value={valor}
                        type="number"
                        onChange={onChange}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                        }}
                        errors={errors}
                    />
                </Grid>
            )
        default:
            return;

    }
}

export default SwitchParametros