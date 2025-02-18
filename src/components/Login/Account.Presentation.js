import * as React from 'react';
import Logout from '@mui/icons-material/Logout';
import { Account } from '@toolpad/core/Account';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import {useNavigate} from "react-router-dom";

/*계정정보를 보여주는 tool*/

export default function AccountSlotPresentation({authentication, session}) {

    return (
        <AuthenticationContext.Provider value={authentication}>
            <SessionContext.Provider value={session}>
                {/* preview-start */}
                <Account
                    slotProps={{
                        signInButton: {
                            color: 'success',
                        },
                        signOutButton: {
                            color: 'success',
                            startIcon: <Logout />,
                        },
                        preview: {
                            variant: 'expanded',
                            slotProps: {
                                avatarIconButton: {
                                    sx: {
                                        width: 'fit-content',
                                        margin: 'auto',
                                    },
                                },
                                avatar: {
                                    variant: 'rounded',
                                },
                            },
                        },
                    }}
                />
                {/* preview-end */}
            </SessionContext.Provider>
        </AuthenticationContext.Provider>
    );
}