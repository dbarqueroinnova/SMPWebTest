import { useQuery } from "@tanstack/react-query";
import { getList } from "./services/menu.service";
import { LinearProgress } from "@mui/material";
import { ToastErrorDatabase } from "./components/Progress/ToastErrorDatabase";
import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";
import { useSelector, useDispatch } from "react-redux"

function BuildRoutes(props) {
    const menu = useSelector((state) => state.menu);
    const dispatch = useDispatch()

    const { data, isLoading, error } = useQuery({
        queryKey: ['getRutas'],
        queryFn: () => getList(menu, dispatch),
    })

    if (isLoading) return <LinearProgress />;

    if (error) return <ToastErrorDatabase />;

    return (
        <ResponsiveDrawer routes={data}>
            {props.children}
        </ResponsiveDrawer>
    )
}

export default BuildRoutes