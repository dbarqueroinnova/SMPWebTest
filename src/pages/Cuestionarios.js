import {
  Alert,
  alpha,
  Box,
  Collapse,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdCancel, MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import TableCuestionarios from "./../components/TableCuestionarios";

import {
  actualizarCuestionario,
  crearCuestionario,
  getCuestionarios,
  getTipoPreguntas,
} from "@/services/cuestionario.service";
import { FormularioCuestionario } from "../views/Cuestionarios/FormularioCuestionario";
import LoadingQuery from "../components/Progress/LoadingQuery";
import { ToastErrorDatabase } from "../components/Progress/ToastErrorDatabase";
import { Toast } from "../components/toast";

export default function Cuestionarios () {
  const [reset, setReset] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [tabla, setTabla] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [cuestionarioDelete, setCuestionarioDelete] = useState("");
  const [view, setView] = useState(false);
  const [cuestionarioSelect, setCuestionarioSelect] = useState({
    cuestionarioId: 0,
    nombre: "",
    preguntas: [],
    estado: 1,
  });
  const queryClient = useQueryClient();
  const eliminar = (data) => {
    setIsDelete(true);
    setNuevo(false);
    setTabla(false);
    let dataeliminar = data;
    dataeliminar.estado = false;
    setCuestionarioDelete(dataeliminar);
  };

  const guardar = async (data) => {

    if (data.pregunta.length === 0) {
      toast.error("El cuestionario debe incluir preguntas", { delay: 1 });
      return
    } else if (data.pregunta.every(item => item.estado === false)) {
      toast.error("El cuestionario debe incluir preguntas", { delay: 1 });
      return
    }

    try {
      if (data.cuestionarioId !== 0) {
        await actualizarCuestionario(data);
      } else {
        await crearCuestionario(data);
      }
      const message = `Cuestionario ${data.cuestionarioId !== 0 ? "actualizado " : "registrado "
        }exitosamente`;
      toast.success(message, { delay: 1 });
      setTabla(true);
      setNuevo(false);
      setReset(!reset);
    } catch (error) {
      toast.error("Error de conexión", { delay: 1 });
    }
  };

  const deleteCuestionario = async () => {
    try {
      await actualizarCuestionario(cuestionarioDelete);
      setIsDelete(false);
      setTabla(true);
      toast.success("Cuestionario eliminado exitosamente");
    } catch (error) {
      toast.error("Error de conexión");
    }
  };
  const cuestionarios = useQuery({
    queryKey: ["getCuestionarios"],
    queryFn: () => getCuestionarios(),
  });

  const tipoPreguntas = useQuery({
    queryKey: ["getTipoPreguntas"],
    queryFn: () => getTipoPreguntas(),
  });
  const mutation = useMutation({
    mutationFn: guardar,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getCuestionarios"] });
    },
    onError: (error) => {
      console.log(`rolling back optimistic update with id ${error}`);
    },
  });
  if (cuestionarios.isLoading || tipoPreguntas.isLoading)
    return <LoadingQuery />;

  if (cuestionarios.error || tipoPreguntas.error) {
    return <ToastErrorDatabase />;
  }
  return (
    <>
      <Box p={3}  maxWidth="100%" component="main" >
        <Collapse in={isDelete}>
          <Toolbar
            style={{ justifyContent: "flex-end" }}
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },

              bgcolor: (theme) =>
                alpha(
                  theme.palette.error.main,
                  theme.palette.action.activatedOpacity
                ),
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              Eliminar Cuestionario
            </Typography>

            <Tooltip title="Eliminar Cuestionario">
              <IconButton onClick={deleteCuestionario}>
                <MdDeleteOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar">
              <IconButton
                onClick={() => {
                  setCuestionarioSelect({
                    cuestionarioId: 0,
                    nombre: "",
                    preguntas: [],
                    estado: 1,
                  });
                  setTabla(true);
                  setNuevo(false);
                  setIsDelete(false);
                }}
              >
                <MdCancel />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Collapse>
        <Collapse in={isDelete}>
          <Alert severity="warning">
            El cuestionario <strong>{cuestionarioDelete?.nombre}</strong> se
            eliminará de manera permanente
          </Alert>
        </Collapse>
        <Collapse in={tabla}>
          <TableCuestionarios
            rest={reset}
            view={setView}
            nuevo={() => {
              setTabla(false);
              setNuevo(true);
            }}
            eliminar={eliminar}
            cuestionarios={cuestionarios.data}
            selectEdit={(cuestionario) => {
              setCuestionarioSelect({
                cuestionarioId: cuestionario.cuestionarioId,
                nombre: cuestionario.nombre,
                preguntas: cuestionario.pregunta,
              });
              setTabla(false);
              setNuevo(true);
            }}
          />
        </Collapse>
        <Collapse in={nuevo}>
          <FormularioCuestionario
            view={view}
            cancelar={() => {
              setCuestionarioSelect({
                cuestionarioId: 0,
                nombre: "",
                preguntas: [],
                estado: 1,
              });
              setTabla(true);
              setNuevo(false);
              setView(false);
              setReset(!reset);
            }}
            tipoPreguntas={tipoPreguntas.data}
            cuestionario={cuestionarioSelect}
            handleSubmit={mutation.mutate}
          />
        </Collapse>
      </Box>
      <Toast />
    </>
  );
};
