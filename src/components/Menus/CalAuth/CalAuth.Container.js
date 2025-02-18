import React, {useEffect, useState} from "react";
import search from "../../Utils/HandleSearch";
import axiosInstance from "../../../apis/axios/instance";
import option from "../../Utils/searchOption";
import CalAuthPresentation from "./CalAuth.Presentation";

function CalAuthContainer () {

    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
    const [originalData, setOriginalData] = useState([]); // 오리지널 데이터
    const [options, setOptions] = useState([]); //콤보박스 옵션 데이터
    const [searchOptionValue, setSearchOptionValue] = useState("");

    const handleOnChange = (value) => {
        setSearchOptionValue(value);
    };

    const handleSearch = () => {
        const filtered = search(searchOptionValue, originalData, filteredData);
        setFilteredData(filtered);
    };

    const handleDataFromTable = (data) => {

        const formattedData = data.map(item => ({
            ...item,
            CHANGEDATE: new Date(item.CHANGEDATE),
        }));

        setOriginalData(formattedData);
        setFilteredData(formattedData);
    };

    const searchOption = () => {

        /**
         * useEffect 에서는 비동기가 적용되지 않는다.
         * 별도 함수로 데이터 포맷팅만 처리
         * useEffect : 콜백 함수가 아무것도 반환하지 않고나, cleanup function만
         * 반환해야 할것으로 정의 되어있다.  (promise를 반환할 수 없음)
         *
         * */
        axiosInstance.get(`/ddlCalAuth`, {

        }).then(response => {

            const optionData = option(response.data);
            setOptions(optionData);

        }).catch(error => {
            console.log(error);
        })

    }

    useEffect(() => {
        searchOption()
    }, []);

    useEffect(() => {
        handleSearch()
    }, [searchOptionValue]);

    return <CalAuthPresentation options={options} handleOnChange={handleOnChange} handleSearch={handleSearch}
                                filteredData={filteredData} handleDataFromTable={handleDataFromTable} />;
}

export default CalAuthContainer;