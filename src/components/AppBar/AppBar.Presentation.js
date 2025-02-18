import {AppBar, Box, CssBaseline, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import DrawerContainer from "./Drawer.Container";

function AppBarPresentation({handleOnClick, handleLogin, open, setOpen}) {

    const drawerWidth = 240;
    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="variant"
                        aria-label="menu"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                        onClick={handleOnClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        App Bar
                    </Typography>
                </Toolbar>

            </AppBar>
            <Box component={"nav"}
                 sx={{ width: {sm : 240}, flexShrink: {sm: 0}} }
                 aria-label="menuList"
             >
                {open && <DrawerContainer open={open} setOpen={setOpen} />}
            </Box>
        </Box>
    );

}

export default AppBarPresentation;