import {AppProvider} from "@toolpad/core/AppProvider";
import {NAVIGATION} from "./Navigation";
import {Paper} from "@mui/material";
import {DashboardLayout} from "@toolpad/core/DashboardLayout";
import TabContainer from "../Tabs/Tab.Container";
import * as React from "react";
import AccountSlotContainer from "../Login/Account.Container";


function MainPresentation({MainProps}){

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={MainProps.router}
            theme={MainProps.theme}
            branding={{
                title: 'DemoProject',
                homeUrl: './Dashboard'
            }}
        >
            <Paper sx={{ width: '100%' }}>
                <DashboardLayout
                    slots={{
                        sidebarFooter: () => <AccountSlotContainer id={MainProps.id} name={MainProps.name} email={MainProps.email} />,
                    }}
                >
                    {MainProps.ActiveComponent ? <TabContainer label={MainProps.Pathname} Component={MainProps.ActiveComponent}/>
                        : <TabContainer label={MainProps.Pathname} Component={<div></div>}/>}
                </DashboardLayout>
            </Paper>

        </AppProvider>
    );
}

export default MainPresentation;