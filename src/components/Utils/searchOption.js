import axiosInstance from "../../apis/axios/instance";

const option = (data) => {

    if(Array.isArray(data)){
        const formatted = data.map((item) => ({
            label: item.dataTextField,
            value: item.dataValueField,
        }));

        return formatted;
    }

}

export default option;