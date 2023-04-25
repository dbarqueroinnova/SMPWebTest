import { TextField, Typography } from "@mui/material";
import * as React from 'react';

function TextFieldParametros({ name, value, type, onChange, inputProps, onInput, errors }) {
    return (
        <>
            <TextField
                fullWidth
                name={name}
                label={name}
                variant="outlined"
                required
                type={type}
                onChange={onChange}
                value={value}
                inputProps={inputProps}
                onInput={onInput}
                error={errors !== undefined && errors[name] ? true : false}
            />
            <Typography variant="inherit" sx={{color: 'red'}}>
                    {errors !== undefined && errors[name]  && errors[name]}
            </Typography>
        </>
    );
}

export default TextFieldParametros