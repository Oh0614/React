import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const MenuItem = ({ item, onSelect }) => {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);

    const handleClick = () => {
        if (item.tabYn) {
            onSelect(item); // 탭 열기
        } else {
            setSubMenuOpen((prev) => !prev); // 하위 메뉴 열기/닫기
        }
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={item.NAME} />
                {item.haWiMENU && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.haWiMENU && (
                <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.haWiMENU.map((subItem) => (
                            <MenuItem key={subItem.ID} item={subItem} onSelect={onSelect} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

