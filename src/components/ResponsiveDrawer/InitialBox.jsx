import { Box } from "@mui/material";

export const InitalBox = (props) => {
    return (
        <>
            <Box sx={{
                display: { xs: "none", sm: "block" },
                ml: '240px',
                mt: '90px'
            }}>
                {props.children}
            </Box>
            <Box sx={{
                p: 1,
                display: { xs: "block", sm: "none" },
                mt: '60px'
            }}>
                {props.children}
            </Box>
        </>
    )
};
