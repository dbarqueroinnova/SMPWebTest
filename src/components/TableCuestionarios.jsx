import * as React from "react";

import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { ThemeProvider, useTheme } from "@emotion/react";
import * as locales from "@mui/material/locale";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { alpha } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect } from "react";
import { Typography } from "@mui/material";
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: "fecha",
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

function EnhancedTableToolbar({
  cuestionario,
  selectEdit,
  eliminar,
  nuevo,
  view,
}) {
  return (
    <Toolbar
      style={{ justifyContent: "flex-end" }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(cuestionario !== null && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {cuestionario && (
        <>
          <Tooltip title="Ver Cuestionario">
            <IconButton
              onClick={() => {
                selectEdit(cuestionario);
                view(true);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar Cuestionario">
            <IconButton onClick={() => selectEdit(cuestionario)}>
              <FiEdit3 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar Cuestionario">
            <IconButton onClick={() => eliminar(cuestionario)}>
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
        </>
      )}
      {!cuestionario && (
        <>
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Cuestionarios
          </Typography>

          <Tooltip title="Nuevo Cuestionario">
            <IconButton onClick={nuevo}>
              <VscNewFile />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

export default function TableCuestionarios({
  rest,
  cuestionarios,
  selectEdit,
  eliminar,
  nuevo,
  view,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombre");
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const dense = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const locale = "esES";
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = cuestionarios.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected(null);
  };

  const handleClick = (event, id) => {
    if (selected?.cuestionarioId === id) {
      setSelected(null);
    } else {
      let newSelected = cuestionarios.find((x) => x.cuestionarioId === id);
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected?.cuestionarioId === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cuestionarios.length) : 0;
  const theme = useTheme();

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );
  useEffect(() => {
    setSelected(null);
  }, [rest]);

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeProvider theme={themeWithLocale}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            cuestionario={selected}
            selectEdit={selectEdit}
            eliminar={eliminar}
            nuevo={nuevo}
            view={view}
          />

          <TableContainer>
            <Table
              // sx={{ maxWidth: "100%" }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={cuestionarios.length}
              />
              <TableBody>
                {stableSort(cuestionarios, getComparator(order, orderBy)).filter(p => p.estado == true)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.cuestionarioId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row.cuestionarioId)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.cuestionarioId}
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
                          {row.fechaModificación}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cuestionarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
          />
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
