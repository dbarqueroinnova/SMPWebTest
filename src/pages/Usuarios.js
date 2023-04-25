import { Collapse, Grid, IconButton, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import TableUsuarios from "../components/TableUsuarios";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { getRoles } from "../services/rol.service";
import { FormularioUsuarios } from "../views/Usuarios/FormularioUsuario";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  actualizarUsuario,
  crearUsuario,
  getUsuarios,
} from "../services/usuarios.service";
import { toast } from "react-toastify";
import { Toast } from "../components/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastErrorDatabase } from "../components/Progress/ToastErrorDatabase";
import LoadingQuery from "../components/Progress/LoadingQuery";

function Usuarios() {
  const [userSelect, setUserSelect] = useState({
    id: "",
    nombre: "",
    telefono: "",
    identificacion: "",
    email: "",
    rolId: "",
    estado: 0,
  });
  const [isAddOrEdit, setIsAddOrEdit] = useState(false);
  const queryClient = useQueryClient();

  const saveUser = async (data) => {
    try {
      if (data.usuarioId !== 0) {
        await actualizarUsuario(data);
      } else {
        await crearUsuario(data);
      }
      const message = `Usuario ${data.usuarioId !== 0 ? "actualizado" : "registrado "
        }exitosamente`;
      toast.success(message, { delay: 1 });
      setIsAddOrEdit(false);
    } catch (error) {
      toast.error("Error de conexión", { delay: 1 });
    }
  };

  const mutation = useMutation({
    mutationFn: saveUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getUsuarios"] });
    },
    onError: (error) => {
      console.log(`rolling back optimistic update with id ${error}`);
    },
  });

  const eliminarUsuario = async (data) => {
    let usuario = data;
    usuario.estado = 0;
    try {
      await actualizarUsuario(usuario);
      toast.success("Usuario eliminado exitosamente");
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

  const usuarios = useQuery({
    queryKey: ["getUsuarios"],
    queryFn: () => getUsuarios(),
  });

  const roleList = useQuery({
    queryKey: ["getRoles"],
    queryFn: () => getRoles(),
  });

  if (usuarios.isLoading || roleList.isLoading) return <LoadingQuery />;

  if (usuarios.error || roleList.error) {
    return <ToastErrorDatabase />;
  }

  return (
    <>
      <Container component="main" maxWidth="100%">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 3, md: 4 }}
          justifyContent="center"
          mt="25px"
        ></Grid>
        <Collapse in={isAddOrEdit}>
          <FormularioUsuarios
            back={() => {
              setUserSelect({
                id: "",
                nombre: "",
                telefono: "",
                identificacion: "",
                email: "",
                rolId: "",
                estado: 0,
              });
              setIsAddOrEdit(false);
            }}
            user={userSelect}
            roles={roleList.data}
            saveUser={mutation.mutate}
          />
        </Collapse>
        <Collapse in={!isAddOrEdit}>
          <TableUsuarios
            nuevo={() => {
              setUserSelect({
                id: "",
                nombre: "",
                telefono: "",
                identificacion: "",
                email: "",
                rolId: "",
                estado: 0,
              });
              setIsAddOrEdit(true);
            }}
            eliminarUsuario={eliminarUsuario}
            usuarios={usuarios.data}
            selectEdit={(data) => {
              setUserSelect({
                usuarioId: data.usuarioId,
                nombre: data.nombre,
                telefono: data.telefono,
                identificacion: data.identificacion,
                email: data.email,
                rolId: data.rolId,
                estado: data.estado,
              });
              setIsAddOrEdit(true);
            }}
          />
        </Collapse>
      </Container>
      <Toast />
    </>
  );
};

export default Usuarios
