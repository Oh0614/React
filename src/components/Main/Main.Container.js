import * as React from 'react';
import {useDemoRouter} from '@toolpad/core/internal';
import {NAVIGATION} from './Navigation';
import {useTheme} from "@mui/material";
import {useLocation} from "react-router";
import MainPresentation from "./Main.Presentation";

function MainContainer() {
    const router = useDemoRouter('/Dashboard');
    const theme = useTheme();

    const location = useLocation();
    const { id, email, name } = location.state || {};

    const Pathname = router.pathname.split('/').pop();
    const ActiveComponent = NAVIGATION.find((item) => item.segment === Pathname)?.component;

    const MainProps = {
        router: router,
        theme: theme,
        id: id,
        name: name,
        email: email,
        ActiveComponent: ActiveComponent,
        Pathname: Pathname
    }

    return <MainPresentation MainProps={MainProps}/>;
}

export default MainContainer;
