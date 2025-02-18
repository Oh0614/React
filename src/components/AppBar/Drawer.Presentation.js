import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import DashboardIcon from "@mui/icons-material/Dashboard";


function DrawerPresentation({open, setOpen, menuList, handleOnClick}) {

    /**
     * 메뉴 Icon
     * */
    const icons = {
        HistoryIcon: <HistoryIcon />,
        DashboardIcon: <DashboardIcon />
    }

    return (
        <div>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={handleOnClick}>
                    <List>
                        { menuList && (
                            menuList.map((item) => (
                                <ListItem key={item.sort_number} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon ? icons[item.icon] : <DashboardIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default DrawerPresentation;