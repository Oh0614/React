import * as React from "react";
import {useNavigate} from "react-router-dom";
import AccountPresentation from "./Account.Presentation";

export default function AccountSlotContainer({id, name, email}){
    const loginSession = {
        user: {
            name: name,
            email: email,
            image: '',
        },
    };
    const [session, setSession] = React.useState(loginSession);
    const navigate = useNavigate();

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: name,
                        email: email,
                        image: '',
                    },
                });
            },
            signOut: () => {
                localStorage.removeItem("accessToken");

                navigate('/SignIn');
            },
        };
    }, []);

    return <AccountPresentation authentication={authentication} session={session} />;
}
