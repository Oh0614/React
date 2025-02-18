import DrawerPresentation from "./Drawer.Presentation";
import axiosInstance from "../../apis/axios/instance";
import {useEffect, useState} from "react";

function DrawerContainer({open, setOpen}) {

    const [menuList, setMenuList] = useState([])

    const getMenuList = async () => {
        axiosInstance.get('/menu', {

        }).then(response => {
            console.log(response.data);

            setMenuList(response.data);

            return response.data;
        })
    };

    const handleOnClick = () => {
        setOpen(false);

    }

    useEffect(() => {
        getMenuList()
    }, []);

    return <DrawerPresentation open={open} setOpen={setOpen} menuList={menuList} handleOnClick={handleOnClick}/>
}

export default DrawerContainer;