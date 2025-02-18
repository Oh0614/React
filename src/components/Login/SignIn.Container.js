import * as React from 'react';
import {AppProvider} from '@toolpad/core/AppProvider';
import {SignInPage} from '@toolpad/core/SignInPage';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../../apis/axios/instance";
import DecodingToken from "../Utils/DecodingToken";
import SignInPresentation from "./SignIn.Presentation";

const providers = [{ id: 'credentials', name: 'Email and Password' }];

function SignInContainer() {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSignIn = async (provider, formData) => {
        // FormData에서 email, password, tandc 값을 추출
        const email = formData.get('email');
        const password = formData.get('password');

        // API 호출
        axiosInstance.get(`/user`, {
            withCredentials: true,  //credential 정보를 포함할건지 여부 (쿠키첨부, 헤더에 인증항목이 있는지)
            params: {
                email: email,
                password: password
            },
        })
        .then(response => {
            const data = response.data.data;
            /**Access Token 을 복호화 해서 화면으로 넘긴다 id, name, email*/
            const decodingInfoJson = DecodingToken(data);

            localStorage.setItem("accessToken", data);

            if(decodingInfoJson) {
                navigate('/Toolpad', {
                    state: {
                        id: decodingInfoJson.id,
                        email: decodingInfoJson.email,
                        name: decodingInfoJson.name
                    }
                });
            } else {
                alert('User not found. Please check your credentials.');
            }
        })
        .catch(error => {
            alert(error.response.data.error);
            console.error(error.response.data);
        });
    }

    return <SignInPresentation theme={theme} handleSignIn={handleSignIn} providers={providers} />;

}

export default SignInContainer;