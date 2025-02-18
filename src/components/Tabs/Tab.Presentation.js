import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import {IconButton, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {TabPanel} from "@mui/lab";
import React from "react";

function TabPresentation({value, handleChange, activeTab, handleClose, components}){
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange}>
                        {activeTab && (
                            activeTab.map((item)=>(
                                <Tab key={activeTab.indexOf(item)} label={
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {item}
                                        <IconButton
                                            component={"div"}           //button 클래스를 중첩할 수 없어 div type 으로 변경해줌
                                            onClick={() => handleClose(item)}
                                            sx={{ ml: 1 }}>
                                            <CloseOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                } value={activeTab.indexOf(item)}></Tab>
                            ))
                        )}
                    </Tabs>
                </Box>
                {components && (
                    components.map((Component, index)=>(
                        <TabPanel key={index} value={index}>{<Component />}</TabPanel>
                    ))
                )}
            </TabContext>
        </Box>
    );
}

export default TabPresentation;