// components/navigation/Navigation.js
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuController from "../Navigation/MenuController";
import SignInContainer from "../Login/SignIn.Container";
import CalAuthContainer from "../Menus/CalAuth/CalAuth.Container";
import HistoryContainer from "../Menus/History/History.Container";

/**
 * 클릭시에는 접히는 이벤트 추가 필요
 * 메뉴 main : 단일 메뉴 / 클릭하면 바로 화면 오픈
 * 메뉴 폴드형 : 폴더 메뉴 / 클릭하면 메뉴 list 오픈 or 하위 메뉴 열리게 이벤트 추가
 * */

export const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main Menu',
    },
    {
        segment: 'Dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        component: CalAuthContainer,
    },
    {
        segment: 'SubMenu',
        title: 'SubMenu',
        icon: <HistoryIcon />,
        component: HistoryContainer,
    },
    { kind: 'divider' },
    {
        segment: 'MenuController',
        title: 'MenuController',
        icon: <DescriptionIcon />,
        component: MenuController,
    },
    {
        segment: 'SignIn',
        title: 'SignIn',
        icon: <DescriptionIcon />,
        component: SignInContainer,
    },
];
