import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import * as React from 'react'
import { useRef } from "react";

function TextFieldPasswordParametros({ name, value, onChange }) {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const prevCountRef = useRef(value);

    return (
        <Grid item md={4} xs={12} sx={{ p: 1 }}>
            <FormControl variant="outlined" fullWidth required={prevCountRef.current === value ? false : true}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    label="Contraseña"
                    endAdornment={prevCountRef.current !== value &&
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={onChange}
                    value={prevCountRef.current === value ? '' : value.trim()}
                />
            </FormControl>
        </Grid>
    )
}

export default TextFieldPasswordParametros