import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MdDeleteOutline, MdCancel } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { IoSaveSharp } from "react-icons/io5";
import { CruidView } from '../Constants/General';

export const EnhancedTableToolbar = ({ selected, SingularCruidName, PluralCruidName, showNewEvent, showEditEvent, showViewEvent, showDeleteEvent, showCancelEvent, handleSaveClick, handleConfirmDeleteClick, view }) => {
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
          {}
        </Typography>
      )}
      {(selected === null && view === CruidView.List) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >{PluralCruidName}
        </Typography>
      )}
      {(selected !== null && view === CruidView.List) && (
        <Tooltip title={`Ver ${SingularCruidName}`}>
          <IconButton onClick={showViewEvent}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      )}
      {(view === CruidView.Create) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Nuevo {SingularCruidName}
        </Typography>
      )}
      {(view === CruidView.Edit) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Modificar {SingularCruidName}
        </Typography>
      )}
      {(view === CruidView.Delete) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >Eliminar {SingularCruidName}
        </Typography>
      )}
      {(view === CruidView.View) && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >{SingularCruidName}
        </Typography>
      )}

      {(selected === null && view === CruidView.List) && (
        <Tooltip title={`Nuevo ${SingularCruidName}`}>
          <IconButton onClick={showNewEvent}>
            <VscNewFile />
          </IconButton>
        </Tooltip>
      )}
      {(selected !== null && view === CruidView.List) && (
        <Tooltip title={`Modificar ${SingularCruidName}`}>
          <IconButton onClick={showEditEvent}>
            <FiEdit3 />
          </IconButton>
        </Tooltip>
      )}
      {(selected !== null && view === CruidView.List) && (
        <Tooltip title={`Eliminar ${SingularCruidName}`}>
          <IconButton onClick={showDeleteEvent}>
            <MdDeleteOutline />
          </IconButton>
        </Tooltip>
      )}

      {(view === CruidView.Create || view === CruidView.Edit) && (
        <Tooltip title={`Guardar ${SingularCruidName}`}>
          <IconButton>
            <IoSaveSharp onClick={handleSaveClick} />
          </IconButton>
        </Tooltip>
      )}
      {(view === CruidView.Delete) && (
        <Tooltip title={`Eliminar ${SingularCruidName}`}>
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