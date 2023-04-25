import {
  alpha,
  Box,
  Checkbox,
  createTheme,
  IconButton,
  TablePagination,
  TableSortLabel,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@emotion/react";
import * as locales from "@mui/material/locale";
import { visuallyHidden } from "@mui/utils";
import { VscNewFile } from "react-icons/vsc";
export const TableComponet = ({
  selectEdit,
  viewListRoles,
  columns,
  rows,
  nuevo,
}) => {
  const role = "asc";
  const roleBy = "calories";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [roleSelect, setRolSelect] = React.useState(null);
  const locale = "esES";
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombre");
  const theme = useTheme();

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );
  function descendingComparator(a, b, roleBy) {
    if (b[roleBy] < a[roleBy]) {
      return -1;
    }
    if (b[roleBy] > a[roleBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(role, roleBy) {
    return role === "desc"
      ? (a, b) => descendingComparator(a, b, roleBy)
      : (a, b) => -descendingComparator(a, b, roleBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const role = comparator(a[0], b[0]);
      if (role !== 0) {
        return role;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const handleClick = (event, roleId) => {
    if (roleSelect?.roleId === roleId) {
      setRolSelect(null);
    } else {
      let newSelected = rows.find((x) => x.roleId === roleId);
      setRolSelect(newSelected);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {columns.map((headCell) => (
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
                {headCell.name}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  const isSelected = (roleId) => roleSelect?.roleId === roleId;
  return (
    <Box sx={{ width: "100%" }}>
      <ThemeProvider theme={themeWithLocale}>
        <Paper sx={{ width: "100%", mb: 2, mt: "30px" }}>
          <ToolbarComponent
            nuevo={nuevo}
            selectEdit={selectEdit}
            roleSelect={roleSelect}
            viewListRoles={viewListRoles}
          />
          <TableContainer >
            <Table     sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"} aria-label="caption table" >
            
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(role, roleBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    const isItemSelected = isSelected(row.roleId);
                    const labelId = `enhanced-table-checkbox-${row.roleId}`;
                    return (
                      <TableRow
                        hover
                        key={key}
                        tabIndex={-1}
                        aria-checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.roleId)}
                        role="checkbox"
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
                        <TableCell scope="row" padding="none" component="th">
                          {row.roleId}
                        </TableCell>
                        <TableCell align="right">{row.roleName}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

const ToolbarComponent = (props) => {
  const { roleSelect, viewListRoles, selectEdit, nuevo } = props;

  return (
    <Toolbar
      style={{ justifyContent: "flex-end" }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(roleSelect !== null && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {roleSelect && (
        <>
          
          <Tooltip title="Editar Rol">
            <IconButton onClick={() => selectEdit(roleSelect)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ver Permisos">
            <IconButton onClick={() => viewListRoles(roleSelect)}>
              <OpenInNewIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      )}
      {!roleSelect && (
        <>
        <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {"Roles"}
          </Typography>
          <Tooltip title="Nuevo Rol">
            <IconButton onClick={nuevo}>
              <VscNewFile />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};
