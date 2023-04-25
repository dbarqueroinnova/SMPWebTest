import * as React from 'react';
import cloneDeep from "lodash/cloneDeep";
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { MdDeleteOutline, MdCancel } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { IoSaveSharp } from "react-icons/io5";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { visuallyHidden } from '@mui/utils';
import { Form } from '../views/Productos/Form';
import { View } from '../views/Productos/View';
import { CruidView } from '../Constants/General';
import { getProductos, createProductos, editProductos } from '../services/productos.service';
import { getConvenios } from '../services/convenios.service';

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
  return order === 'desc'
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
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'codigo',
    numeric: true,
    disablePadding: false,
    label: 'Código',
  },
  {
    id: 'convenio.nombre',
    numeric: true,
    disablePadding: false,
    label: 'Convenio',
  },
  {
    id: 'fechaModificacion',
    numeric: true,
    disablePadding: false,
    label: 'Última Modificacion',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { selected, showNewEvent, showEditEvent, showDeleteEvent, showCancelEvent, showViewEvent, handleSaveClick, handleConfirmDeleteClick, view } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(((selected !== null && view === CruidView.List) || view === CruidView.Edit || view === CruidView.View) && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        ...(view === CruidView.Create && {
          bgcolor: (theme) =>
            alpha(theme.palette.success.main, theme.palette.action.activatedOpacity),
        }),
        ...(view === CruidView.Delete && {
          bgcolor: (theme) =>
            alpha(theme.palette.error.main, theme.palette.action.activatedOpacity),
        })
      }}
    >
      {(selected !== null && view === CruidView.List) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          { }
        </Typography>
      )}
      {(selected === null && view === CruidView.List) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Productos
        </Typography>
      )}
      {(view === CruidView.Create) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Nuevo Producto
        </Typography>
      )}
      {(view === CruidView.Edit) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Modificar Producto
        </Typography>
      )}
      {(view === CruidView.Delete) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Eliminar Producto
        </Typography>
      )}
      {(view === CruidView.View) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Producto
        </Typography>
      )}

      {(selected === null && view === CruidView.List) && (
        <Tooltip title="Nuevo Producto">
          <IconButton onClick={showNewEvent}>
            <VscNewFile />
          </IconButton>
        </Tooltip>
      )}
      {(selected !== null && view === CruidView.List) && (
        <Tooltip title="Ver Producto">
          <IconButton onClick={showViewEvent}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      )}
      {(selected !== null && view === CruidView.List) && (
        <Tooltip title="Modificar Producto">
          <IconButton onClick={showEditEvent}>
            <FiEdit3 />
          </IconButton>
        </Tooltip>
      )}
      {(selected !== null && view === CruidView.List) && (
        <Tooltip title="Eliminar Producto">
          <IconButton onClick={showDeleteEvent}>
            <MdDeleteOutline />
          </IconButton>
        </Tooltip>
      )}

      {(view === CruidView.Create || view === CruidView.Edit) && (
        <Tooltip title="Gurdar Producto">
          <IconButton>
            <IoSaveSharp onClick={handleSaveClick} />
          </IconButton>
        </Tooltip>
      )}
      {(view === CruidView.Delete) && (
        <Tooltip title="Eliminar Producto">
          <IconButton onClick={handleConfirmDeleteClick}>
            <MdDeleteOutline />
          </IconButton>
        </Tooltip>
      )}
      {(view === CruidView.Create || view === CruidView.Edit || view === CruidView.Delete || view === CruidView.View) && (
        <Tooltip title="Cancelar">
          <IconButton onClick={showCancelEvent}>
            <MdCancel />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar >
  );
}

let emptyRecord = {
  productoId: 0,
  nombre: '',
  descripcion: '',
  convenio: { convenioId: 0 },
  detalleProducto: [],
  rangoEdad: []
}

function Productos() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [showList, setShowList] = React.useState(true);
  const [showCreate, setShowCreate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentCruidPage, setCurrentCruidPage] = React.useState(CruidView.List);
  const [convenios, setConvenios] = React.useState([]);
  const [productos, setProductos] = React.useState([]);
  const [producto, setProducto] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, productoId) => {

    if (producto?.productoId === productoId) {
      setProducto(null);
    } else {
      let newSelected = productos.find(x => x.productoId === productoId);
      setProducto(newSelected);
    }

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (productoId) => producto?.productoId === productoId;

  const handleNewClick = (event) => {
    setProducto(emptyRecord);
    setShowList(false);
    setShowCreate(true);
    setCurrentCruidPage(CruidView.Create)
  };
  const handleEditClick = (event) => {
    setShowList(false);
    setShowEdit(true);
    setCurrentCruidPage(CruidView.Edit)
  };
  const handleDeleteClick = (event) => {
    setShowList(false);
    setShowDelete(true);
    setCurrentCruidPage(CruidView.Delete)
  };
  const handleViewClick = (event) => {
    setShowList(false);
    setShowView(true);
    setCurrentCruidPage(CruidView.View)
  };

  const handleCancelClick = (event) => {
    setProducto(null);
    setShowList(true);
    setShowView(false);
    setShowCreate(false);
    setShowEdit(false);
    setShowDelete(false);
    setCurrentCruidPage(CruidView.List)
  };
  const handleSaveClick = (event) => {
    if (producto.productoId > 0) {
      editProductos(producto).then((response) => {
        if (response.status == 200) {
          getData();
          handleCancelClick();
        }
      }).catch((error) => {
        console.log('Error', error.message);
      });
    }
    else {
      createProductos(producto).then((response) => {
        if (response.status == 200) {
          getData();
          handleCancelClick();
        }
      }).catch((error) => {
        console.log('Error', error.message);
      });
    }
  };

  const handleConfirmDeleteClick = () => {
    producto.estado = false;
    editProductos(producto).then((response) => {
      if (response.status == 200) {
        getData();
        handleCancelClick();
      }
    }).catch((error) => {
      console.log('Error', error.message);
    });
  }

  const handleProductoInputChange = (event) => {
    const tmpProducto = cloneDeep(producto);
    if (event.target.id !== undefined) {
      tmpProducto[event.target.id] = event.target.value;
    }
    else {
      tmpProducto.convenio.convenioId = event.target.value
    }
    setProducto(tmpProducto);
  }

  const handleAddDetalle = (detalleProducto) => {
    if (detalleProducto.nombre !== null && detalleProducto.nombre !== '') {
      const tmpProducto = cloneDeep(producto);
      tmpProducto.detalleProducto.push(detalleProducto);
      setProducto(tmpProducto);
    }
  }

  const handleRemoveDetalle = (index) => {
    const tmpProducto = cloneDeep(producto);
    tmpProducto.detalleProducto = tmpProducto.detalleProducto.filter((val, i) => {
      if (i == index) {
        if (val.detalleProductoId > 0) {
          val.estado = false;
          return val;
        }
      }
      else {
        return val;
      }

    })
    setProducto(tmpProducto);
  }

  const handleAddRango = (rango) => {
    if (rango.edadInicial !== null && rango.edadFinal !== '') {
      const tmpProducto = cloneDeep(producto);
      tmpProducto.rangoEdad.push(rango);
      setProducto(tmpProducto);
    }
  }

  const handleRemoveRango = (index) => {
    const tmpProducto = cloneDeep(producto);
    tmpProducto.rangoEdad = tmpProducto.rangoEdad.filter((val, i) => {
      if (i == index) {
        if (val.rangoEdadId > 0) {
          val.estado = false;
          return val;
        }
      }
      else {
        return val;
      }

    })
    setProducto(tmpProducto);
  }

  const getData = () => {
    getProductos().then((response) => {
      if (response.status == 200) {
        setProductos(response.data);
      }
    }).catch((error) => {
      console.log('Error', error.message);
    });
    getConvenios().then((response) => {
      if (response.status == 200) {
        setConvenios(response.data);
      }
    }).catch((error) => {
      console.log('Error', error.message);
    });

  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Box  mt="25px" p={3}>
      <Paper>
        <EnhancedTableToolbar
          selected={producto}
          showNewEvent={handleNewClick}
          showEditEvent={handleEditClick}
          showDeleteEvent={handleDeleteClick}
          showCancelEvent={handleCancelClick}
          showViewEvent={handleViewClick}
          handleSaveClick={handleSaveClick}
          handleConfirmDeleteClick={handleConfirmDeleteClick}
          view={currentCruidPage} />
        <Collapse in={showList}>
          <TableContainer className='table-responsive'>
            <Table stickyHeader>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={productos.length}
              />
              <TableBody>
                {stableSort(productos, getComparator(order, orderBy)).filter(p => p.estado == true)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.productoId);
                    const labelId = `enhanced-table-checkbox-${row.productoId}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.productoId)}
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
                              'aria-labelledby': labelId,
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
                        <TableCell align="right">{row.codigo}</TableCell>
                        <TableCell align="right">{row.convenio.nombre}</TableCell>
                        <TableCell align="right">
                          <Moment format="DD/MM/YYYY hh:mm a">
                            {row.fechaModificacion}
                          </Moment>
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
            count={productos.filter(p => p.estado == true).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página" />
        </Collapse>
        <Collapse in={showCreate}>
          {showCreate && <Form producto={producto} convenios={convenios} handleProductoInputChange={handleProductoInputChange} handleAddDetalle={handleAddDetalle} handleRemoveDetalle={handleRemoveDetalle} handleAddRango={handleAddRango} handleRemoveRango={handleRemoveRango}></Form>}
        </Collapse>
        <Collapse in={showEdit}>
          {showEdit && <Form producto={producto} convenios={convenios} handleProductoInputChange={handleProductoInputChange} handleAddDetalle={handleAddDetalle} handleRemoveDetalle={handleRemoveDetalle} handleAddRango={handleAddRango} handleRemoveRango={handleRemoveRango}></Form>}
        </Collapse>
        <Collapse in={showView}>
          {showView && <View producto={producto}></View>}
        </Collapse>
        <Collapse in={showDelete}>
          <Alert severity="warning">
            El producto <strong>{producto?.nombre}</strong> se eliminará de manera permanente
          </Alert>
        </Collapse>
      </Paper>
    </Box>
  );
}

export default Productos