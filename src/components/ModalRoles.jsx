import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Fade, TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "white",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalComponentRoles = ({
  selectEdit,
  setSelectEdit,
  open,
  handleClose,
}) => {
  const [rol, setRol] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectEdit(
      {
        rolName: rol,
        rolId: selectEdit.roleId ? selectEdit.roleId : 0,
      },
      true
    );
  };

  useEffect(() => {
    if (selectEdit.roleName) {
      setRol(selectEdit.roleName);
    } else {
      setRol("");
    }
  }, [selectEdit]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          {selectEdit.roleName ? (
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Rol: {selectEdit.roleName}
            </Typography>
          ) : (
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Creación de rol
            </Typography>
          )}
          <TextField
            onChange={(e) => setRol(e.target.value)}
            value={rol}
            error={false}
            margin="normal"
            required={true}
            fullWidth
            id={selectEdit.id}
            label="Nombre del rol"
            name="Rol"
            type="text"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {selectEdit.roleName ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
