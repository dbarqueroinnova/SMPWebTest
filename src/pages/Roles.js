import {
  Container,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TableComponet } from "../components/Table";
import { ModalComponentRoles } from "../components/ModalRoles";
import {
  getMenuOptions,
  getRoles,
  insertRol,
  insertRolDetail,
  updateRol,
  updateRolDetail,
} from "../services/rol.service";
import Module from "../components/Module";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../components/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingQuery from "../components/Progress/LoadingQuery";
import { ToastErrorDatabase } from "../components/Progress/ToastErrorDatabase";

import { MdCancel } from "react-icons/md";

function Roles () {
  const [selectEdit, setSelectEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState(null);
  const [showRolesAndOption, setShowRolesAndOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuListSelect, setMenuListSelect] = useState([]);
  const queryClient = useQueryClient();
  const openModal = (data) => {
    setSelectEdit(data);
    setShowModal(true);
  };
  const columns = [
    {
      id: "Id",
      numeric: false,
      disablePadding: true,
      name: "Id",
    },
    {
      id: "Rol",
      numeric: true,
      disablePadding: false,
      name: "Rol",
    },
  ];
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      neutral: {
        main: "#202945",
        contrastText: "#fff",
      },
    },
  });
  const menuList = useQuery({
    queryKey: ["getMenuOptions"],
    queryFn: () => getMenuOptions(),
  });

  const rolList = useQuery({
    queryKey: ["getRoles"],
    queryFn: () => getRoles(),
  });
  const selectRole = (value) => {
    if (!value) {
      setRole(null);
      return;
    }
    setShowRolesAndOption(true);
    const menuTmp = cloneDeep(menuList.data);
    setRole(rolList.data.find((x) => x.roleId === value.roleId));
    menuTmp.forEach((modulo) => {
      modulo.items.forEach((menu) => {
        menu.checked = rolList.data
          .find((x) => x.roleId === value.roleId)
          .items.includes(menu.optionId);
      });
    });
    setMenuListSelect(menuTmp);
  };
  const changeState = async (data) => {
    try {
      if (role) {
        if (data.checked) {
          const obj = {
            id: 0,
            rol: {
              rolId: role.roleId,
            },
            menuOption: {
              optionId: parseInt(data.value),
            },
            estado: true,
          };
          await insertRolDetail(obj);
          toast.success("Permiso agregado exitosamente", { delay: 1 });
          window.location.reload();
        } else {
          const obj = {
            // "id": 0,
            rol: {
              rolId: role.roleId,
            },
            menuOption: {
              optionId: parseInt(data.value),
            },
            estado: false,
          };
          await updateRolDetail(obj);
          toast.success("Permiso eliminado exitosamente", { delay: 1 });
          window.location.reload();
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error de conexión", { delay: 1 });
    }
  };

  const add = async (data, isAdd) => {
    try {
      if (data.rolId != 0) {
        await updateRol(data);

        toast.success("Rol actualizado exitosamente", { delay: 1 });
      } else {
        await insertRol(data);
        toast.success("Rol agregado exitosamente", { delay: 1 });
      }
      // getData();
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error de conexión", { delay: 1 });
    }
  };

  const mutationGet = useMutation({
    mutationFn: add,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getRoles"] });
    },
    onError: (error) => {
      console.log(`rolling back optimistic update with id ${error}`);
    },
  });

  const mutationPostPut = useMutation({
    mutationFn: changeState,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getRoles"] });
    },
    onError: (error) => {
      console.log(`rolling back optimistic update with id ${error}`);
    },
  });
  if (menuList.isLoading || rolList.isLoading) return <LoadingQuery />;

  if (menuList.isLoading || rolList.isLoading) {
    return <ToastErrorDatabase />;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toast />
        <Container component="main" maxWidth="100%">
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 3, md: 4 }}
            justifyContent="center"
            mt="25px"
          >
        
           
          </Grid>

          {!showRolesAndOption && (
            <TableComponet
              nuevo={() => {
                openModal({});
              }}
              rows={rolList.data}
              columns={columns}
              selectEdit={openModal}
              viewListRoles={selectRole}
            />
          )}
        </Container>

        <Container component="main" maxWidth="100%">
          {showRolesAndOption && (
            <>
              <ToolbarComponentGestion
                rolName={role.roleName}
                back={() => setShowRolesAndOption(false)}
              />
              <div className="row mt-4">

                {menuListSelect.map((item, key) => {
                  return (
                    <div key={key} className="col-md-4 mt-2">
                      <Module
                        name={item.module}
                        items={item.items}
                        changeState={mutationPostPut.mutate}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </ThemeProvider>
      <ModalComponentRoles
        selectEdit={selectEdit}
        setSelectEdit={mutationGet.mutate}
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Roles

const ToolbarComponentGestion = (props) => {
  const { back, roleSelect = null ,rolName} = props;

  return (
    <Toolbar
      style={{ justifyContent: "flex-end" }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(roleSelect === null && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
        <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Rol:{rolName}
          </Typography>
      <Tooltip title="Cancelar">
        <IconButton onClick={back}>
          <MdCancel />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
