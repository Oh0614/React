import axiosInstance from "../axios/instance";

/**
 * axios 라우트 호출 
 * server 에 정의 된 express api 호출하여 라우트한다
 * */
const Get = async (getName, callback) => {
    try {

        const response = await axiosInstance.get(`/${getName}`);

        callback(response.data);

    } catch (e) {

        console.error('Error importing data', e.message);

    }
}

export default Get;