import React, {useState} from "react";
import {Box} from "@mui/material";
import {NAVIGATION} from "../Main/Navigation";
import TabContainer from "../Tabs/Tab.Container";
import {useDemoRouter} from "@toolpad/core/internal";
import axiosInstance from "../../apis/axios/instance";
import AppBarContainer from "../AppBar/AppBar.Container";

/*MENU 로 구성한 컴포넌트를 합쳐서 메뉴를 구성하는 컴포넌트
* MENU 들의 어미컴포넌트이다
* */
const MenuController = () => {
    const router = useDemoRouter('/Dashboard');

    const Pathname = router.pathname.split('/').pop();
    const ActiveComponent = NAVIGATION.find((item) => item.segment === Pathname)?.component;

    const [open, setOpen] = useState(false);

    return (
        <div>
            <AppBarContainer open={open} setOpen={setOpen}></AppBarContainer>

            <Box display="flex" flexDirection="default" width="80%">
                {ActiveComponent ? <TabContainer label={Pathname} Component={ActiveComponent}/>
                    : <TabContainer label={Pathname} Component={<div></div>}/>}
            </Box>
        </div>
    );
};

export default MenuController;
