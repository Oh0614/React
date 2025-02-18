// axiosInstance.js
import axios from 'axios';
let isAlertDisplayed = false;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * access Token 이 401 인 경우 재발급을 하기 위해 reissuance api를 호출 
 * 재발급 하기 전, refresh token 만료 여부를 확인하여, 만료 된 경우 error 발생 시켜 로그아웃 처리
 * new token 이 발급되면 header 에 저장
 * */
const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post(
            'user/reissuance',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                withCredentials: true,
            }
        );

        console.log(response.data.data);
        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);

        return accessToken;
    } catch (error) {
        localStorage.removeItem("accessToken");
        return null;
    }
};

/**
 * 요청 인터셉터 : access Token 을 헤더로 전송
 * 요청 헤더의 토큰에 이상이 있다면, 재발급 혹은 로그아웃 처리를 위함 
 * */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 응답 인터셉터 : 요청의 에러처리와 토큰 재발급을 함께 처리함
 * */
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response);

        if(!isAlertDisplayed)
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const errorResponse = error.response.data;

        /**
         * 로그인 하지 않은 상태 (401) 토큰을 찾을 수 없거나 만료 되었을 경우,
         * new Token 을 받기 위해 refresh Token 을 사용해 재발급 받음
         * 헤더에 새로 생성된 토큰을 넣어준다
         * Authorization 헤더에 Bearer 인증타입 : JWT/OAuth 토큰을 사용한다는 약속
         * */
        if(error.response?.status === 401 && !originalRequest._retry
            && error.response.data.message === "jwt expired") {
            originalRequest._retry = true;                  //무한루프 방지

            try{
                const newToken = await refreshAccessToken(); // 새 JWT 요청

                if (newToken) {
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                throw refreshError;
            }

        }
        /**
         * 토큰이 만료 되었다고 판단하는 경우 (Refresh Token 을 인식할 수 없거나, 만료기간이 지난경우)
         * 메세지를 출력하고 로그인 화면으로 돌아간다 : 추후 다른 처리를 위해 따로 조건을 빼둠
         * 401 : 토큰 만료
         * 403 : 토큰이 없는경우
         * 500 : 서버 에러
         * */
        console.log(errorResponse);
        if(error.response?.status >= 500 && !isAlertDisplayed) {
            alert(errorResponse.message);
            return Promise.reject(error);
        }

        if(error.response?.status === 404 && !isAlertDisplayed) {
            alert(errorResponse.message);
            return Promise.reject(error);
        }

        if(error.response?.status >= 400 && !isAlertDisplayed) {
            isAlertDisplayed = true;
            alert(errorResponse.message);
            window.location.href = '/';
            return Promise.reject(error);
        }

        setTimeout(() => {
            isAlertDisplayed = false;
        }, 3000);
    }


);

export default axiosInstance;
