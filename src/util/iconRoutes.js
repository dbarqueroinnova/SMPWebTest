import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupAdd from "@mui/icons-material/GroupAdd";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

export function selectIcon(icon) {
    switch (icon) {
        case 'ShoppingCartIcon':
            return ShoppingCartIcon;
        case 'AssignmentIcon':
            return AssignmentIcon;
        case 'HelpCenterIcon':
            return HelpCenterIcon;
        case 'PersonAddIcon':
            return PersonAddIcon
        case 'SecurityIcon':
            return SecurityIcon;
        case 'ManageAccountsIcon':
            return ManageAccountsIcon;
        case 'SettingsIcon':
            return SettingsIcon;
        default:
            return GroupAdd;
    }
}

export function principalIconRouteSubMenus(name) {
    switch (name) {
        case 'Gestión de permisos':
            return 'ManageAccountsIcon';
        default:
            return 'ManageAccountsIcon'
    }
}