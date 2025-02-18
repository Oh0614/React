import axiosInstance from "../axios/instance";

/**
 * 부모 컴포넌트에게서 받은 tableName 으로 api 라우팅하여
 * post body param 을 테이블에 insert 하고
 * return code 를 반환해준다
 * callback의 return code를 좀 더 상세화 해서 alert 을 만들면 좋겠따.
 *
 * */
const Create = async (tableName, value, callback) => {
    try{

        axiosInstance.post(`/${tableName}/create`, {

            tableName: tableName,
            params: { value }

        }, { headers: { 'Content-Type': 'application/json' } })
        .then(function (res) {

            callback(res.status);

        })
        .catch(function (error) {

            console.log(error);
            callback(error.status);

        });


    } catch (e) {
        console.error(e);
    }

};

export default Create;