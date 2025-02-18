import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse, Box } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const MenuList = ({ menuItems, onSelect }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleSubMenu = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    return (
        <Box width="250px" bgcolor="#f5f5f5" p={2} borderRadius={2} boxShadow={2}>
            <List>
                {menuItems.map((item) => (
                    <Box key={item.ID}>
                        <ListItem
                            button
                            onClick={() =>
                                item.haWiMENU ? toggleSubMenu(item.ID) : onSelect(item)
                            }
                        >
                            <ListItemText primary={item.NAME} />
                            {item.haWiMENU &&
                                (openMenuId === item.ID ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        {item.haWiMENU && (
                            <Collapse in={openMenuId === item.ID} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.haWiMENU.map((subItem) => (
                                        <ListItem
                                            key={subItem.ID}
                                            button
                                            style={{ paddingLeft: "32px" }}
                                            onClick={() => onSelect(subItem)}
                                        >
                                            <ListItemText primary={subItem.NAME} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </Box>
                ))}
            </List>
        </Box>
    );
};
