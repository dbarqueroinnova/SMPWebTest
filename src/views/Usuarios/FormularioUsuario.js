import {
  Button,
  FormControlLabel,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container, alpha } from "@mui/system";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { IoSaveSharp } from "react-icons/io5";

export const FormularioUsuarios = ({ user, roles, saveUser, back }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [estado, setEstado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveUser({
      usuarioId: user.usuarioId ? user.usuarioId : 0,
      nombre: nombre,
      telefono: telefono,
      identificacion: identificacion,
      email: email,
      rol: {
        rolId: parseInt(roleId)
      },
      estado: estado,
      password:""
    });
  };
  useEffect(() => {
    setNombre(user.nombre ? user.nombre : "");
    setTelefono(user.telefono ? user.telefono : "");
    setIdentificacion(user.identificacion ? user.identificacion : "");
    setEmail(user.email ? user.email : "");
    setRoleId(user.rolId ? user.rolId : 1);
    setEstado(user.estado ? user.estado : false);
  }, [user]);
  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
    >
      <Container component="main" maxWidth="100%">
        <EnhancedTableToolbar nombre={nombre} back={back} />
        <TextField
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
          error={false}
          margin="normal"
          required={true}
          //   fullWidth
          id="nombre"
          label="Nombre"
          name="nombre"
        />
        <TextField
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
          error={false}
          margin="normal"
          required
          //   fullWidth
          id="telefono"
          label="Teléfono"
          name="Teléfono"
          type="number"
        />
        <TextField
          onChange={(e) => setIdentificacion(e.target.value)}
          value={identificacion}
          error={false}
          margin="normal"
          required
          //   fullWidth
          id="identificacion"
          label="Número identificación"
          name="identificacion"
          type="text"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={false}
          margin="normal"
          required
          //   fullWidth
          id="correo"
          label="Correo electrónico"
          name="correo"
          type="email"
        />
        <TextField
          value={roleId ? roleId : 0}
          onChange={(e) => setRoleId(e.target.value)}
          id="roleId"
          select
          label="Rol usuario"
          SelectProps={{
            native: true,
          }}
          required
        >
          {roles.map((option) => (
            <option key={option.roleId} value={option.roleId}>
              {option.roleName}
            </option>
          ))}
        </TextField>

        <FormControlLabel
          labelPlacement="start"
          name={"Estado usuario"}
          control={
            <Switch
              checked={estado}
              onChange={(e) => setEstado(e.target.checked ? true : false)}
            />
          }
          label={"Estado usuario"}
        />
        {/* <Container component="main" maxWidth="md">
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {user.id ? "Actualizar" : "Guardar"}
          </Button>
        </Container> */}
      </Container>
    </Box>
  );
};
function EnhancedTableToolbar({ guardar, nombre, back, view }) {
  return (
    <Toolbar
      style={{ justifyContent: "flex-end" }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }}
    >
      {!view && (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {nombre ? "Modificar Usuario" : "Crear Usuario"}
          </Typography>
          <Tooltip title="Guardar Usuario">
            <IconButton type="submit" onClick={(e) => {}}>
              <IoSaveSharp />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title="Cancelar">
        <IconButton onClick={() => back(false)}>
          <MdCancel />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
