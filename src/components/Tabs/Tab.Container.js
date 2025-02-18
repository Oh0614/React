import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import {TabPanel} from "@mui/lab";
import {IconButton, Tabs} from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TabPresentation from "./Tab.Presentation";

function TabContainer ({label, Component} ) {
    /**
     * activeTab : 활성화 되어 있는 탭들의 list
     * 생성해야 하는 시기 : TabContainer 컴포넌트가 처음 시작될 때
     *
     * Component : 부모 컴포넌트에서 받아오는 컴포넌트
     * list 형태든 뭐든 관리를 해서 갈아끼울수 있어야하는데 ..
     * > 생각해보니까 panel을 생성할 때 컴포넌트를 유지하고 있는거 아닌가?
     *
     * */

    const [value, setValue] = useState(0);
    const [activeTab, setActiveTab] = useState([]);
    const [components, setComponents] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = (item) => {
        setActiveTab((prevTabs) => prevTabs.filter((tab) => tab !== item));         //필터링을 이용해 배열에서 제외
        if (value >= activeTab.findIndex((tab) => tab === item)) {
            setValue((prev) => Math.max(prev - 1, 0));                      //숫자로 이루어져 있기 때문에 값을 -1
        }
        setComponents((prevTabs) => prevTabs.filter((tab) => tab.name !== item));   //필터링을 이용해 배열에서 제외
    }

    useEffect(() => {
        if (!activeTab.includes(label))  activeTab.push(label);
        if (!components.includes(Component))  components.push(Component);

        setActiveTab([...activeTab]);           //활성화된 탭 상태관리
        setComponents([...components]);         //컴포넌트 상태관리
        setValue(activeTab.indexOf(label));

    }, [label]);

    return <TabPresentation value={value} handleChange={handleChange} activeTab={activeTab}
                            handleClose={handleClose} components={components} />;
}

export default TabContainer;