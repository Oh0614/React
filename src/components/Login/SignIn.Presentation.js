import {AppProvider} from "@toolpad/core/AppProvider";
import {SignInPage} from "@toolpad/core/SignInPage";
import * as React from "react";

function SignInPresentation ({theme, handleSignIn, providers}){
    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={handleSignIn}
                slotProps={{
                    emailField: { variant: 'standard', autoFocus: false },
                    passwordField: { variant: 'standard' },
                    submitButton: { variant: 'outlined' },
                }}
                providers={providers}
            />

        </AppProvider>
    );
}

export default SignInPresentation;