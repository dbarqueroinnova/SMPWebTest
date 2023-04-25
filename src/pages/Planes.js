import * as React from "react";
import cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Moment from "react-moment";
import { visuallyHidden } from "@mui/utils";
import { Form } from "../views/Planes/Form";
import { View } from "../views/Planes/View";
import { EnhancedTableToolbar } from "../components/EnhancedTableToolbar.component";
import { CruidView } from "../Constants/General";
import {
  createPlanes,
  editPlanes,
  getPlanes,
} from "../services/planes.service";
import { getProductos } from "../services/productos.service";
import { getMonedas } from "../services/monedas.service";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "nombre",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    id: "producto.nombre",
    numeric: true,
    disablePadding: false,
    label: "Producto",
  },
  {
    id: "fechaModificacion",
    numeric: true,
    disablePadding: false,
    label: "Última Modificación",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  selected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

let emptyRecord = {
  planId: 0,
  nombre: "",
  descripcion: "",
  producto: { productoId: 0, convenio: { convenioId: 0 }, detalleProducto: [], rangoEdad: [] },
  planDetalleProducto: [],
  precioRangoEdad: [],
};

function Planes() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [showList, setShowList] = React.useState(true);
  const [showCreate, setShowCreate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentCruidPage, setCurrentCruidPage] = React.useState(
    CruidView.List
  );
  const [plan, setPlan] = React.useState(null);
  const [planes, setPlanes] = React.useState([]);
  const [productos, setProductos] = React.useState([]);
  const [monedas, setMonedas] = React.useState([]);
  const [openConfirmarDestacado, setOpenConfirmarDestacado] = React.useState(false);
  const [antiguoPlanDestacado, setAntiguoPlanDestacado] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, planId) => {
    if (plan?.planId === planId) {
      setPlan(null);
    } else {
      let newSelected = planes.find((x) => x.planId === planId);
      newSelected = setPlanesDetallesProducto(
        newSelected,
        newSelected.producto.productoId
      );
      newSelected = setPrecioRangoEdad(
        newSelected,
        newSelected.producto.productoId
      );
      setPlan(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (planId) => plan?.planId === planId;

  const handleNewClick = (event) => {
    setPlan(emptyRecord);
    setShowList(false);
    setShowCreate(true);
    setCurrentCruidPage(CruidView.Create);
  };
  const handleEditClick = (event) => {
    setShowList(false);
    setShowEdit(true);
    setCurrentCruidPage(CruidView.Edit);
  };
  const handleDeleteClick = (event) => {
    setShowList(false);
    setShowDelete(true);
    setCurrentCruidPage(CruidView.Delete);
  };
  const handleCancelClick = (event) => {
    setPlan(null);
    setShowList(true);
    setShowCreate(false);
    setShowEdit(false);
    setShowDelete(false);
    setShowView(false);
    setCurrentCruidPage(CruidView.List);
  };

  const handleViewClick = (event) => {
    setShowList(false);
    setShowView(true);
    setCurrentCruidPage(CruidView.View);
  };

  const handleSaveClick = (event) => {
    if (plan.planId > 0) {
      plan.producto = {
        productoId: 0,
        convenio: { convenioId: 0 },
        detalleProducto: [],
        rangoEdad: []
      };
      editPlanes(plan)
        .then((response) => {
          if (response.status == 200) {
            if (antiguoPlanDestacado != null) {
              antiguoPlanDestacado.producto = {
                productoId: 0,
                convenio: { convenioId: 0 },
                detalleProducto: [],
                rangoEdad: []
              };
              editPlanes(antiguoPlanDestacado)
                .then((response) => {
                  if (response.status == 200) {
                    getData();
                    handleCancelClick();
                  }
                })
                .catch((error) => {
                  console.log("Error", error.message);
                });
            }
            else {
              getData();
              handleCancelClick();
            }
          }
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    } else {
      createPlanes(plan)
        .then((response) => {
          if (response.status == 200) {
            getData();
            handleCancelClick();
          }
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    }
  };

  const handleConfirmDeleteClick = () => {
    plan.estado = false;
    plan.producto = {
      productoId: 0,
      convenio: { convenioId: 0 },
      detalleProducto: [],
    };
    editPlanes(plan)
      .then((response) => {
        if (response.status == 200) {
          getData();
          handleCancelClick();
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  const handlePlanInputChange = (event) => {
    let tmpPlan = cloneDeep(plan);
    if (event.target.id !== undefined) {
      switch (event.target.id) {
        case "destacado":
          tmpPlan[event.target.id] = Boolean(event.target.checked);
          if (Boolean(event.target.checked)) {
            let tmpAntiguoPlanDestacado = planes.filter(p => p.producto.productoId == tmpPlan.producto.productoId).find(p => p.destacado === true && p.planId != tmpPlan.planId)
            if (tmpAntiguoPlanDestacado !== undefined) {
              setAntiguoPlanDestacado(tmpAntiguoPlanDestacado);
              setOpenConfirmarDestacado(true);
            }
          }
          else {
            if (antiguoPlanDestacado !== null) {
              setAntiguoPlanDestacado(null);
            }
          }
          break;
        case "procesoManual":
          tmpPlan[event.target.id] = Boolean(event.target.checked);
          break;
        default:
          tmpPlan[event.target.id] = event.target.value;
          break;
      }
    }
    if (event.target.name == "producto") {
      tmpPlan = setPlanesDetallesProducto(tmpPlan, event.target.value);
      tmpPlan = setPrecioRangoEdad(tmpPlan, event.target.value);
    }
    if (event.target.name == "Moneda") {
      let selectedmoneda = monedas.find(m => m.monedaId === event.target.value)
      tmpPlan.moneda = selectedmoneda;
    }
    setPlan(tmpPlan);
  };

  const setPlanesDetallesProducto = (tmpPlan, productoId) => {
    let selectedProducto = productos.find((p) => p.productoId == productoId);
    tmpPlan.producto.productoId = productoId;
    tmpPlan.planDetalleProducto
      .filter((pd) =>
        selectedProducto.detalleProducto.some(
          (p) => p.detalleProductoId == pd.detalleProductoId
        )
      )
      .forEach((element) => {
        element.estado = true;
        element.detalleProducto = selectedProducto.detalleProducto.find(
          (dp) => dp.detalleProductoId == element.detalleProductoId
        );
      });
    selectedProducto.detalleProducto
      .filter(
        (pd) =>
          pd.estado == true &&
          !tmpPlan.planDetalleProducto.some(
            (p) => p.detalleProductoId == pd.detalleProductoId
          )
      )
      .forEach((element) => {
        tmpPlan.planDetalleProducto.push({
          planDetalleProductoId: 0,
          planId: tmpPlan.planId,
          detalleProductoId: element.detalleProductoId,
          valor: "",
          detalleProducto: element,
          estado: true,
        });
      });
    tmpPlan.planDetalleProducto
      .filter(
        (pd) =>
          !selectedProducto.detalleProducto.some(
            (p) => p.detalleProductoId == pd.detalleProductoId
          )
      )
      .forEach((element) => {
        element.estado = false;
        element.detalleProducto = selectedProducto.detalleProducto.find(
          (dp) => dp.detalleProductoId == element.detalleProductoId
        );
      });
    return tmpPlan;
  };

  const setPrecioRangoEdad = (tmpPlan, productoId) => {
    let selectedProducto = productos.find((p) => p.productoId == productoId);
    tmpPlan.producto.productoId = productoId;
    tmpPlan.precioRangoEdad
      .filter((pd) =>
        selectedProducto.rangoEdad.some(
          (p) => p.rangoEdadId == pd.rangoEdadId
        )
      )
      .forEach((element) => {
        element.estado = true;
        element.rangoEdad = selectedProducto.rangoEdad.find(
          (dp) => dp.rangoEdadId == element.rangoEdadId
        );
      });
    selectedProducto.rangoEdad
      .filter(
        (pd) =>
          pd.estado == true &&
          !tmpPlan.precioRangoEdad.some(
            (p) => p.rangoEdadId == pd.rangoEdadId
          )
      )
      .forEach((element) => {
        tmpPlan.precioRangoEdad.push({
          precioRangoEdadId: 0,
          planId: tmpPlan.planId,
          rangoEdadId: element.rangoEdadId,
          precioColegiadoMasculino: 0,
          precioColegiadoFemenino: 0,
          precioDependienteMasculino: 0,
          precioDependienteFemenino: 0,
          rangoEdad: element,
          estado: true,
        });
      });
    tmpPlan.precioRangoEdad
      .filter(
        (pd) =>
          !selectedProducto.rangoEdad.some(
            (p) => p.rangoEdadId == pd.rangoEdadId
          )
      )
      .forEach((element) => {
        element.estado = false;
        element.rangoEdad = selectedProducto.rangoEdad.find(
          (dp) => dp.rangoEdadId == element.rangoEdadId
        );
      });
    return tmpPlan;
  };

  const handlePlanDetalleInputChange = (event) => {
    const tmpPlan = cloneDeep(plan);
    let detalleProductoId = Number.parseInt(
      event.target.id.replace("valor-", "")
    );
    tmpPlan.planDetalleProducto
      .filter((pd) => pd.detalleProductoId == detalleProductoId)
      .forEach((pd) => {
        pd.valor = event.target.value;
      });
    setPlan(tmpPlan);
  };

  const handleRangoEdadInputChange = (event) => {
    const tmpPlan = cloneDeep(plan);
    let rangoEdadId = Number.parseInt(
      event.target.id.replace("precioColegiadoMasculino-", "")
        .replace("precioColegiadoFemenino-", "")
        .replace("precioDependienteMasculino-", "")
        .replace("precioDependienteFemenino-", "")
    );
    tmpPlan.precioRangoEdad
      .filter((pre) => pre.rangoEdadId == rangoEdadId)
      .forEach((pre) => {
        if (event.target.id.includes('precioColegiadoMasculino')) pre.precioColegiadoMasculino = event.target.value;
        if (event.target.id.includes('precioColegiadoFemenino')) pre.precioColegiadoFemenino = event.target.value;
        if (event.target.id.includes('precioDependienteMasculino')) pre.precioDependienteMasculino = event.target.value;
        if (event.target.id.includes('precioDependienteFemenino')) pre.precioDependienteFemenino = event.target.value;
      });
    setPlan(tmpPlan);
  };

  const handleConfirmarDestacadoNo = () => {
    let tmpPlan = cloneDeep(plan);
    tmpPlan.destacado = false;
    setPlan(tmpPlan);
    setAntiguoPlanDestacado(null);
    setOpenConfirmarDestacado(false);
  };
  const handleConfirmarDestacadoSi = () => {
    let tmpAntiguoPlanDestacado = cloneDeep(antiguoPlanDestacado);
    tmpAntiguoPlanDestacado.destacado = false;
    setAntiguoPlanDestacado(tmpAntiguoPlanDestacado);
    setOpenConfirmarDestacado(false);
  };


  const getData = () => {
    getPlanes()
      .then((response) => {
        if (response.status == 200) {
          setPlanes(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
    getProductos()
      .then((response) => {
        if (response.status == 200) {
          setProductos(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
    getMonedas()
      .then((response) => {
        if (response.status == 200) {
          setMonedas(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Box mt="25px" p={3}>
      <Paper>
        <EnhancedTableToolbar
          selected={plan}
          SingularCruidName="Plan"
          PluralCruidName="Planes"
          showNewEvent={handleNewClick}
          showEditEvent={handleEditClick}
          showDeleteEvent={handleDeleteClick}
          showCancelEvent={handleCancelClick}
          showViewEvent={handleViewClick}
          handleSaveClick={handleSaveClick}
          handleConfirmDeleteClick={handleConfirmDeleteClick}
          view={currentCruidPage}
        />
        <Collapse in={showList}>
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={planes.length}
              />
              <TableBody>
                {stableSort(planes, getComparator(order, orderBy))
                  .filter((p) => p.estado == true)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.planId);
                    const labelId = `enhanced-table-checkbox-${row.productoId}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.planId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.nombre}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.nombre}
                        </TableCell>
                        <TableCell align="right">
                          {row.producto.nombre}
                        </TableCell>
                        <TableCell align="right">
                          {row.fechaModificacion == null && (
                            <Moment format="DD/MM/YYYY hh:mm a">
                              {row.fechaModificacion}
                            </Moment>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={planes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
          />
        </Collapse>
        <Collapse in={showCreate}>
          {showCreate && (
            <Form
              plan={plan}
              productos={productos}
              monedas={monedas}
              handlePlanInputChange={handlePlanInputChange}
              handlePlanDetalleInputChange={handlePlanDetalleInputChange}
              handleRangoEdadInputChange={handleRangoEdadInputChange}
            ></Form>
          )}
        </Collapse>
        <Collapse in={showEdit}>
          {showEdit && (
            <Form
              plan={plan}
              productos={productos}
              monedas={monedas}
              handlePlanInputChange={handlePlanInputChange}
              handlePlanDetalleInputChange={handlePlanDetalleInputChange}
              handleRangoEdadInputChange={handleRangoEdadInputChange}
            ></Form>
          )}
        </Collapse>
        <Collapse in={showView}>
          {showView && <View plan={plan}></View>}
        </Collapse>
        <Collapse in={showDelete}>
          <Alert severity="warning">
            El producto <strong>{plan?.nombre}</strong> se eliminará de manera
            permanente
          </Alert>
        </Collapse>
      </Paper>
      <Dialog open={openConfirmarDestacado} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Desea cambiar el plan destacado?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ya existe un plan destacado para este producto, desea remplasarlo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmarDestacadoNo}>No</Button>
          <Button onClick={handleConfirmarDestacadoSi} autoFocus> si</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Planes
