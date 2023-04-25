import {
  Card,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import cloneDeep from "lodash/cloneDeep";
import { alpha, Box } from "@mui/system";
import { useEffect, useState } from "react";
import { MdAddBox, MdCancel, MdDeleteOutline } from "react-icons/md";
import { GrDrag } from "react-icons/gr";
import { IoSaveSharp } from "react-icons/io5";
import { Toast } from "../../components/toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const FormularioCuestionario = ({
  handleSubmit,
  cuestionario,
  tipoPreguntas,
  cancelar,
  view,
}) => {
  const [nombre, setNombre] = useState("");
  const [preguntasCuestionario, setPreguntasCuestionario] = useState("");
  const [texto, setTexto] = useState("");
  const [tipoPreguntaId, setTipoPreguntaId] = useState(0);

  useEffect(() => {
    setNombre(cuestionario.nombre);
    const preguntas = cloneDeep(cuestionario.preguntas);
    setPreguntasCuestionario(preguntas);
  }, [cuestionario]);

  useEffect(() => {
    if (tipoPreguntas.length > 0) {
      setTipoPreguntaId(tipoPreguntas[0].tipoPreguntaId);
    }
  }, [tipoPreguntas, cuestionario]);
  const guardar = (e) => {
    if (nombre !== "") {
      e.preventDefault();
      const obj = {
        cuestionarioId: cuestionario.cuestionarioId
          ? cuestionario.cuestionarioId
          : 0,
        nombre: nombre,
        estado: true,
        pregunta: preguntasCuestionario,
      };

      handleSubmit(obj);
      setTexto("");
    } else {
      toast.error("Favor completar el formulario de preguntar");
    }
  };
  const removeDetalle = (index) => {
    const newDetalle = cloneDeep(preguntasCuestionario);
    newDetalle[index].estado = false;
    setPreguntasCuestionario(newDetalle);
  };
  const addDetalle = () => {
    if (tipoPreguntaId === 0 || texto === "" || texto === undefined) {
      toast.error("Favor completar el formulario de preguntar");
    } else {
      const newDetalle = {
        preguntaId: 0,
        texto: texto,
        tipoPregunta: {
          tipoPreguntaId: parseInt(tipoPreguntaId),
        },
        estado: true,
      };
      setPreguntasCuestionario([...preguntasCuestionario, newDetalle]);
      setTexto("");
      setTipoPreguntaId(0);
    }
  };
  return (
    <>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <EnhancedTableToolbar
          nombre={nombre}
          guardar={guardar}
          cancelar={cancelar}
          view={view}
          cuestionario={cuestionario}
        />
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            "& .MuiTextField-root": { m: 1, minWidth: "25ch" },
          }}
        >
          <TextField
            disabled={view}
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
        </Paper>
        <Divider sx={{ m: 2 }}>
          <Chip label="Preguntas cuestionario" />
        </Divider>
        {!view && (
          <Paper
            key="detalles"
            className="form-control-group"
            elevation={0}
            sx={{ display: "flex", p: 1, "& .MuiTextField-root": { mr: 1 } }}
          >
            <TextField
              style={{ margin: 0, marginRight: "5px" }}
              value={tipoPreguntaId ? tipoPreguntaId : 0}
              onChange={(e) => setTipoPreguntaId(e.target.value)}
              id="tipoPreguntaId"
              select
              label="Tipo de pregunta"
              SelectProps={{
                native: true,
              }}
              required
            >
              {tipoPreguntas.map((option) => (
                <option
                  key={option.tipoPreguntaId}
                  value={option.tipoPreguntaId}
                >
                  {option.nombre}
                </option>
              ))}
            </TextField>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel htmlFor="descripcion">Pregunta</InputLabel>
              <OutlinedInput
                id={"Pregunta"}
                value={texto}
                endAdornment={
                  <IconButton edge="end" onClick={addDetalle}>
                    <MdAddBox />
                  </IconButton>
                }
                onChange={(e) => setTexto(e.target.value)}
                label="Pregunta"
              />
            </FormControl>
          </Paper>
        )}

        {preguntasCuestionario.length > 0 && (
          <Paper className="mv-40" elevation={0} sx={{ p: 1 }}>
            <Card variant="outlined" sx={{ mt: 1 }}>
              <List>
                {preguntasCuestionario.map((detalle, index) => {
                  if (detalle.estado) {
                    return (
                      <ListItem
                        key={index}
                        secondaryAction={
                          !view ? (
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeDetalle(index)}
                            >
                              <MdDeleteOutline />
                            </IconButton>
                          ) : (
                            <></>
                          )
                        }
                      >
                        <ListItemIcon>
                          <GrDrag />
                        </ListItemIcon>
                        <ListItemText>
                          <Card elevation={0}>
                            <Typography component="div">
                              {detalle.texto}
                            </Typography>
                          </Card>
                        </ListItemText>

                        <Divider />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Card>
          </Paper>
        )}
      </Box>
      <Toast />
    </>
  );
};

function EnhancedTableToolbar({ guardar, nombre, cancelar, view }) {
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
            {nombre ? "Modificar Cuestionario" : "Crear Cuestionario"}
          </Typography>
          <Tooltip title="Guardar Cuestionario">
            <IconButton type="submit" onClick={(e) => guardar(e)}>
              <IoSaveSharp />
            </IconButton>
          </Tooltip>
        </>
      )}
      {view && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Cuestionario
        </Typography>
      )}
      <Tooltip title="Cancelar">
        <IconButton onClick={() => cancelar(false)}>
          <MdCancel />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
