import React, {useState} from "react";
import {Box, Tab} from "@mui/material";

export const TabManager = ({ tabs, onClose, onTabClick }) => {

    const [activeTabId, setActiveTabId] = useState(null); // 활성 탭 ID 상태

    const handleTabClick = (tabId) => {
        setActiveTabId(tabId);
        onTabClick(tabId);
    };

    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.ID}
                    label={tab.NAME}
                    color="primary"
                    onClick={() => handleTabClick(tab.ID)}
                    onDelete={() => onClose(tab.ID)}
                    variant="outlined"
                    sx={{
                        cursor: "pointer",
                        backgroundColor: activeTabId === tab.ID ? 'primary.main' : 'transparent',
                        color: activeTabId === tab.ID ? 'white' : 'black',
                    }}
                />
            ))}
        </Box>
    );
};
